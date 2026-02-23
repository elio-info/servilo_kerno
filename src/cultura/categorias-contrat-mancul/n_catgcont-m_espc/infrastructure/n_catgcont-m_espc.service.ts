import { Inject, Injectable } from '@nestjs/common';
import { Create_Nomencla_CategoriasContratacionManifestacion_Especialidad_Dto } from '../dto/create-n_catgcont-m_espc.dto';
import { Update_Nomencla_CategoriasContratacionManifestacion_Especialidad_Dto } from '../dto/update-n_catgcont-m_espc.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { NomenclaCategorias_ContManifestacion_Especialidad_Model, Nomencla_Categorias_ContratacionManifestacion_Especialidad_Document } from '../schemas/n_catgcont-m_espc.schema';
import { Connection, Model, Types } from 'mongoose';
import { NomenclaCat_ContManifestacion_Especialidad_Entity } from '../schemas/n_catgcont-m_espc.entity';
import { extractNomCat_ContManif, getUserHTTP_JWTS } from 'src/modules/common/extractors';
import { Search_Nomencla_CategoriasContratacionManifestacion_Especialidad_Dto } from '../dto/search-n_catgcont-m_espc.dto';
import { IsRelationshipProvider } from 'src/modules/common/helpers/customIdValidation';
import { DataList } from 'src/modules/common/data-list';
import { TrazasService } from 'src/cultura/trazas/trazas.service';
import { DuplicatedValueError } from 'src/modules/common/errors/duplicated-value.error';
import { ObjectCanNotDeleted } from 'src/modules/common/errors/object-not-found.error';
 
@Injectable()
export class Nomencla_Categorias_ContratacionManifestacion_Especialidad_Service {
  private MODULE = 'categoria_manifestacion cultura especial';
  private IS_NOT_DELETED = { isDeleted: false };
  private cstvldt: IsRelationshipProvider 
  
  constructor(
    @InjectModel( NomenclaCategorias_ContManifestacion_Especialidad_Model.name) private readonly model_ncme: Model < Nomencla_Categorias_ContratacionManifestacion_Especialidad_Document>,
    @InjectConnection() private cnn:Connection,
    @Inject(TrazasService) private traza:TrazasService
  ){  
    this.cstvldt= new IsRelationshipProvider(cnn);
    this.traza.trazaDTO.collection
  }
  
 async findAll(page:number,pageSize:number): Promise <DataList<NomenclaCat_ContManifestacion_Especialidad_Entity>|string> {
  page= ( isNaN(page) || page<= 0)? 1: page;
    // console.log('page',page);
    
    pageSize= ( isNaN(pageSize) || pageSize<= 0)? 15: pageSize;
    // console.log('pagesz',pageSize); 
    const skipCount = (page - 1) * pageSize;

    let cme= await this.model_ncme.find(this.IS_NOT_DELETED).skip(skipCount).lean();
    let cme_e=cme.map(itm=>{ return this.toEntity(itm)});

    return { 
      data:cme_e,
      totalPages:Math.ceil(cme.length/pageSize),
      currentPage:page
    }
  }

  async findId(id:string) : Promise <NomenclaCat_ContManifestacion_Especialidad_Entity|string> {
    return this.toEntity(await this.model_ncme.findById({_id:id}));
  }

  // 
  async create(createDto: Create_Nomencla_CategoriasContratacionManifestacion_Especialidad_Dto , hds:string):Promise <NomenclaCat_ContManifestacion_Especialidad_Entity| string> {
    this.traza.trazaDTO.user=getUserHTTP_JWTS(hds);     
    this.traza.trazaDTO.operation='create';
    this.traza.trazaDTO.error='Ok' ;
    this.traza.trazaDTO.filter=createDto;
    
    let all=await this.model_ncme.find()
    let us= all.map((data) =>{
                let dt=data.name.trim().toLowerCase()
                    ,dt_c=createDto.name.trim().toLowerCase();
                console.log(dt,dt_c);
                if (dt==dt_c) {
                  let err=new DuplicatedValueError( data.name + ' -> ' + this.MODULE);
                  this.traza.trazaDTO.error=err;
                  this.traza.save();
                  return err.toString();
                }
              })
        let crt=null;
        try {
            crt= this.toEntity ( await new this.model_ncme(createDto).save());
            this.traza.trazaDTO.update= crt.toString();
            this.traza.save();
            
          } catch (error) {
              this.traza.trazaDTO.error= error ;
              this.traza.save();
              return error.toString();
          }            
          return crt;
  }

  async update( updDto: Update_Nomencla_CategoriasContratacionManifestacion_Especialidad_Dto, hds:string):Promise <NomenclaCat_ContManifestacion_Especialidad_Entity| string> {
    
    this.traza.trazaDTO.user=getUserHTTP_JWTS(hds);     
    this.traza.trazaDTO.operation='update';
    this.traza.trazaDTO.error='Ok' ;
    this.traza.trazaDTO.filter=updDto;

    let bf=await this.findId(updDto.id);
    this.traza.trazaDTO.before=bf;  
    
    const plc = await this.model_ncme.findOneAndUpdate(
      { _id: updDto.id, ...this.IS_NOT_DELETED },
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

  async remove(id: string,hds :string):Promise <NomenclaCat_ContManifestacion_Especialidad_Entity| string> {

    this.traza.trazaDTO.user=getUserHTTP_JWTS(hds);     
        this.traza.trazaDTO.operation='update';
        this.traza.trazaDTO.error='Ok' ;
        this.traza.trazaDTO.filter={_id:id};
    
        let bf=await this.findId(id);
        this.traza.trazaDTO.before=bf;  
        
        // hijos
            let hijos=await this.cstvldt.validate_onTable('nomenclacategorias_contmanifest_especialidad',{'categoria_manifestacion':id},this.IS_NOT_DELETED);
            console.log('hijos',hijos);
            if (hijos!=0) { //tienes hijos no te borras  
              let error=new ObjectCanNotDeleted (this.MODULE,hijos );
              this.traza.trazaDTO.error= error ;
              this.traza.save();
              return error.toString();
            }
            const plc = await this.model_ncme.findOneAndUpdate(
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

  async search (query: Search_Nomencla_CategoriasContratacionManifestacion_Especialidad_Dto): Promise <NomenclaCat_ContManifestacion_Especialidad_Entity[]|string> {
      // console.log(id_nom_cat_contman)
      let buscar={isDeleted: query.isDeleted}
      let nombre={}
      if (!!query.nombre_categoria_manifestacion_especialidad) {//existe nombre
        if (!!query.exactName) { nombre={ nombre_categoria_manifestacion:query.nombre_categoria_manifestacion_especialidad} ; }
        else
        {nombre={ nombre_categoria_manifestacion: { $regex:query.nombre_categoria_manifestacion_especialidad , $options:'i'}};}
      }
      let padre= !!query.categoria_manifestacion ? {categoria_manifestacio:query.categoria_manifestacion}:{}
      console.log(buscar);
      let bus= {...buscar,...padre,...nombre}
      
      const qCollection =await this.model_ncme.find(bus).exec();
      console.log(qCollection);
      
       let result=qCollection.map((item) =>
        this.toEntity(item)//
      );
      return result;
    }
    
  toEntity (params:NomenclaCategorias_ContManifestacion_Especialidad_Model):NomenclaCat_ContManifestacion_Especialidad_Entity {
      return{
        id:params._id.toString(),
        nombre_categoria_manifestacion_especialidad :params.name,
        isDeleted:params.isDeleted,
        categoria_manifestacion:extractNomCat_ContManif (params.categoria_manifestacion),
        createdAt: params.createdAt,  
        updatedAt: params.updatedAt
      }
    }
}
