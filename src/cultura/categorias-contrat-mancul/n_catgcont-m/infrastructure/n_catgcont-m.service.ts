import { Inject, Injectable, Module } from '@nestjs/common';
import { Create_NomenclaCategorias_ContratacionManifestacion_Dto } from '../dto/create-n_catgcont-m.dto';
import { Update_NomenclaCategorias_ContratacionManifestacion_Dto } from '../dto/update-n_catgcont-m.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { NomenclaCategorias_ContratacionManifestacion_Model, NomenclaCategorias_ContratacionManifestacion_Document } from '../schemas/n_catgcont-m.schema';
import { Connection, Model } from 'mongoose';
import { IsRelationshipProvider } from 'src/modules/common/helpers/customIdValidation';
import { NomenclaCategorias_ContratacionManifestacion_Entity } from '../schemas/n_catcont-m.entity';
import { DataList } from 'src/modules/common/data-list';
import { ObjectCanNotDeleted, ObjectNotFound } from 'src/modules/common/errors/object-not-found.error';
import { TrazasService } from 'src/cultura/trazas/trazas.service';
import { getUserHTTP_JWTS } from 'src/modules/common/extractors';
import { DuplicatedValueError } from 'src/modules/common/errors/duplicated-value.error';
import { Search_NomenclaCategorias_ContratacionManifestacion_Dto } from '../dto/search-n_catgcont-m.dto';
 
@Injectable()
export class NomenclaCategorias_ContratacionManifestacion_Service {
  private MODULE = 'ContratacionManifestacion';
  
  private whereQuery = { isDeleted: false };
  private cstvldt: IsRelationshipProvider 
  constructor(
    @InjectModel( NomenclaCategorias_ContratacionManifestacion_Model.name) private readonly model: Model < NomenclaCategorias_ContratacionManifestacion_Document>,
    @InjectConnection() private cnn: Connection, 
    @Inject(TrazasService) private traza:TrazasService   
    ) {  
      this.cstvldt=new IsRelationshipProvider(this.cnn) ;
      this.traza.trazaDTO.collection= this.MODULE

       }

  async findAll(page: number, pageSize: number): Promise <DataList<NomenclaCategorias_ContratacionManifestacion_Entity>| string> {
    page= ( isNaN(page) || page<= 0)? 1: page;
    // console.log('page',page);
    
    pageSize= ( isNaN(pageSize) || pageSize<= 0)? 15: pageSize;
    // console.log('pagesz',pageSize); 
    const skipCount = (page - 1) * pageSize;

    let cm= await this.model.find(this.whereQuery)
        .skip(skipCount)
        .limit(pageSize)
        .lean()
        .exec();

    let cmClltn=cm.map(itm =>{
       return this.toEntity(itm);
    }  );  
    
    const dataList: DataList<NomenclaCategorias_ContratacionManifestacion_Entity> = {
      data: cmClltn,
      totalPages: Math.ceil(cmClltn.length / pageSize),
      currentPage: page,
    };
    return dataList;
  }

  async findOne(id:string): Promise< NomenclaCategorias_ContratacionManifestacion_Entity|string> {
    let cm= await this.model.findById({_id:id});
    if (!cm) {
          return (new ObjectNotFound(this.MODULE)).toString();
        }
    return this.toEntity(cm);
  }
  
  async create(createDto: Create_NomenclaCategorias_ContratacionManifestacion_Dto, hds : string): Promise<NomenclaCategorias_ContratacionManifestacion_Entity|string> {
    this.traza.trazaDTO.user=getUserHTTP_JWTS(hds);     
    this.traza.trazaDTO.operation='create';
    this.traza.trazaDTO.error='Ok' ;
    this.traza.trazaDTO.filter=createDto;

    let all= await  this.model.find({})
    let us= all.map((data) =>{
            let dt=data.nombre_categoria_manifestacion.trim().toLowerCase()
                ,dt_c=createDto.nombre_categoria_manifestacion.trim().toLowerCase();
            console.log(dt,dt_c);
            if (dt==dt_c) {
              let err=new DuplicatedValueError( data.nombre_categoria_manifestacion + ' -> ' + this.MODULE);
              this.traza.trazaDTO.error=err;
              this.traza.save();
              return err.toString();
            }
          })
    let crt=null;
    try {
        crt= this.toEntity ( await new this.model(createDto).save());
        this.traza.trazaDTO.update= crt.toString();
        this.traza.save();
        
      } catch (error) {
          this.traza.trazaDTO.error= error ;
          this.traza.save();
          return error.toString();
      }            
      return crt;
  } 
  
  async update(updDto: Update_NomenclaCategorias_ContratacionManifestacion_Dto, hds : string): Promise<NomenclaCategorias_ContratacionManifestacion_Entity|string>{
    
    this.traza.trazaDTO.user=getUserHTTP_JWTS(hds);     
    this.traza.trazaDTO.operation='update';
    this.traza.trazaDTO.error='Ok' ;
    this.traza.trazaDTO.filter=updDto;

    let bf=await this.findOne(updDto.id);
    this.traza.trazaDTO.before=bf;  
    
    const plc = await this.model.findOneAndUpdate(
      { _id: updDto.id, ...this.whereQuery },
      updDto,
      {
        new: true
      },
    );
    if (!plc) {
      let err=new Error('Problema con actualizacion de '+this.MODULE)
        this.traza.trazaDTO.error=err;
        this.traza.trazaDTO.update='';
        this.traza.save()
        return err.toString();
    }
    this.traza.trazaDTO.update=plc;    
    this.traza.save()
    return this.toEntity(plc);  
  }

  async remove(id: string, hds : string): Promise<NomenclaCategorias_ContratacionManifestacion_Entity|string>{
    
    this.traza.trazaDTO.user=getUserHTTP_JWTS(hds);     
    this.traza.trazaDTO.operation='update';
    this.traza.trazaDTO.error='Ok' ;
    this.traza.trazaDTO.filter={_id:id};

    let bf=await this.findOne(id);
    this.traza.trazaDTO.before=bf;  
    
    // hijos
        let hijos=await this.cstvldt.validate_onTable('nomenclacategorias_contmanifest_especialidad',{'categoria_manifestacion':id},this.whereQuery);
        console.log('hijos',hijos);
        if (hijos!=0) { //tienes hijos no te borras  
          let error=new ObjectCanNotDeleted (this.MODULE,hijos );
          this.traza.trazaDTO.error= error ;
          this.traza.save();
          return error.toString();
        }
        const plc = await this.model.findOneAndUpdate(
          { _id: id, isDeleted: false },
          {
            isDeleted: true,
          },
        );
    
        if (!plc) {
          let err=new Error('Problema con eliminacion de '+this.MODULE)
            this.traza.trazaDTO.error=err;
            this.traza.trazaDTO.update='';
            this.traza.save()
            return err.toString();
        }    
            this.traza.trazaDTO.update=plc;
            this.traza.save();       
        return this.toEntity(plc);
  }
  
  async search (query: Search_NomenclaCategorias_ContratacionManifestacion_Dto): Promise <NomenclaCategorias_ContratacionManifestacion_Model[]|string> {
    // console.log(id_nom_cat_contman)
    let buscar={isDeleted: query.isDeleted}

    if (!!query.nombre_categoria_manifestacion) {//existe nombre
      if (!!query.exactName) { buscar[' nombre_categoria_manifestacion']=query.nombre_categoria_manifestacion ; }
      else
      {buscar ['nombre_categoria_manifestacion']= { $regex:query.nombre_categoria_manifestacion , $options:'i'};}
    } 
    console.log(buscar);
    
     let result=[];
    const qCollection =await this.model.find(buscar).exec();
    //console.log(provinceCollection);
    
     qCollection.map((item) =>
      result.push(this.toEntity(item))//
    );
    return result;
  }

  toEntity (params:NomenclaCategorias_ContratacionManifestacion_Model):NomenclaCategorias_ContratacionManifestacion_Entity {
    return{
      id:params._id.toString(),
      nombre_categoria_manifestacion :params.nombre_categoria_manifestacion,
      isDeleted:params.isDeleted,
      apoyo_categoria_manifestacion:params.apoyo_categoria_manifestacion,
      createdAt: params.createdAt,  
      updatedAt: params.updatedAt
    }
  }
}
