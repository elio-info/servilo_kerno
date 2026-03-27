import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

import { DataList } from 'src/modules/common/data-list';
import { ErrorX, ObjectCanNotDeleted, ObjectId_NotFound, ObjectNotFound } from 'src/modules/common/errors/object-not-found.error';
import { ConsejoPopular_Municipality_Repository as ConsejoPopular_MunicipalityRepository } from '../domain/repository/consejopopular_municipality.repository';
import { ConsejoPopular_Municipality_Document, ConsejoPopular_Municipality_Model } from '../domain/schemas/consejo_popular.schema';
import { ConsejoPopular_Municipality_Entity } from '../domain/schemas/consejo_popular.entity';
import { Create_ConsejoPopular_Municipality_Dto } from '../domain/dto/create-consejopopular_municipality.dto';
import { Update_ConsejoPopular_Municipality_Dto } from '../domain/dto/update-consejopopular_municipality.dto';
import { TrazasService } from 'src/cultura/trazas/trazas.service';
import { IsRelationshipProvider } from 'src/modules/common/helpers/customIdValidation';
import Search_ConsejoPopular_MunicipalityDto from '../domain/dto/search-consejopopular_municipality.dto';

@Injectable()
export class Mongoose_ConsejoPopular_Municipality_Repository implements ConsejoPopular_MunicipalityRepository {
  private MODULE = 'Consejo_Popular_Municipal';
  private IS_NOT_DELETED = { isDeleted: false };
  private populate_Municipio={ path: 'municipality', populate: { path: 'province' } };
  private cstvldt:IsRelationshipProvider;
  
  constructor(
    @InjectModel(ConsejoPopular_Municipality_Model.name)
    private consejopopular_municipality_Model: Model<ConsejoPopular_Municipality_Model>,
    @InjectConnection() private cnn:Connection
  ) {this.cstvldt= new IsRelationshipProvider(this.cnn)}

  async findAll(
    page: number,
    pageSize: number,
  ): Promise<DataList<ConsejoPopular_Municipality_Entity>|string> {
    const skipCount = (page - 1) * pageSize;

    const consejopopular_municipalities = await this.consejopopular_municipality_Model
        .find(this.IS_NOT_DELETED)
        .skip(skipCount)
        .limit(pageSize)
        .populate('province')
        .populate('municipality')
        .exec();

    const consejopopular_municipalityCollection = consejopopular_municipalities.map((cpmunicipality) =>
      this.toEntity(cpmunicipality),
      //this.toEntity(prov)
    );

    const dataList: DataList<ConsejoPopular_Municipality_Entity> = {
      data: consejopopular_municipalityCollection,
      totalPages: Math.ceil(consejopopular_municipalityCollection.length / pageSize),
      currentPage: page,
    };
    return dataList;
  }

  async create(cp_municipality: Create_ConsejoPopular_Municipality_Dto,traza:TrazasService): Promise<ConsejoPopular_Municipality_Entity | string> {
    
    traza.trazaDTO.filter=cp_municipality;
    let prv=await this.cstvldt.validateId_onTable( 'provinces',cp_municipality.province,traza);
    if (prv.trazaDTO.error!='Ok' )       
        return 'Error en Provincia ';  
    
    let mn_prv=await this.cstvldt.validateId_onTable('municipalities',cp_municipality.municipality,traza );
    if ( mn_prv.trazaDTO.error!='Ok')       
        return 'Error en Municipio';  
    
    let cpm=  await new this.consejopopular_municipality_Model(cp_municipality).save();
    
     traza.trazaDTO.update=JSON.stringify (cpm);//cp_municipality
        traza.trazaDTO.before=''
        traza.trazaDTO.error='Ok';
        traza.save();  
		
    return await this.findOne(cpm._id.toString());
  }

  async findOne(id: string): Promise<ConsejoPopular_Municipality_Entity | string> {
    
    const consejopopular_municipality = await this.consejopopular_municipality_Model
      .findById(id)
      .where(this.IS_NOT_DELETED)
      .populate('province')
      .populate('municipality')

    if (!consejopopular_municipality) {
      return (new ObjectNotFound(this.MODULE)).toString();
    }

    return this.toEntity(consejopopular_municipality);
  }

  async update(
    cp_municipality: Update_ConsejoPopular_Municipality_Dto,
    traza:TrazasService
  ): Promise<ConsejoPopular_Municipality_Entity | string> {
    traza.trazaDTO.filter=JSON.stringify(cp_municipality);
    let cp_municipality_prv=await this.cstvldt.validateId_onTable( 'consejopopular_municipal',cp_municipality.id,traza);
		if (cp_municipality_prv.trazaDTO.error!='Ok' )       
        return 'Error en Provincia ';  
    
		let prv=await this.cstvldt.validateId_onTable( 'provinces',cp_municipality.province,traza );
    if (prv.trazaDTO.error!='Ok' )       
        return 'Error en Provincia ';  
		let mn_prv=await this.cstvldt.validateId_onTable('municipalities',cp_municipality.municipality ,traza);
		if (mn_prv.trazaDTO.error!='Ok' )       
        return 'Error en Municipio ';  
		 
		const updated = await this.consejopopular_municipality_Model.findOneAndUpdate(
		  { _id: cp_municipality.id, ...this.IS_NOT_DELETED },
		  cp_municipality,
		  { new: true,},
		);

		if (!updated) {	
			traza.trazaDTO.error=new ObjectNotFound('Error en actualizacion...Mongoose');
			traza.save(); 
			return traza.trazaDTO.error.toString();  
		}
		console.log('up ',updated);
    
		traza.trazaDTO.update=JSON.stringify (updated);//cp_municipality
		traza.trazaDTO.error='Ok';
		traza.save();  
			
		return await this.findOne(cp_municipality.id);
  }

  async remove(id: string,traza:TrazasService): Promise<ConsejoPopular_Municipality_Entity | string> {
    //verificando existencia
    let cp_municipality_prv=await this.consejopopular_municipality_Model
			.findById(id)
			.where(this.IS_NOT_DELETED);
	let datos={'_id':id};
	traza.trazaDTO.filter=JSON.stringify(datos);
	traza.trazaDTO.before='';
	traza.trazaDTO.update='';
	if(!cp_municipality_prv){
		traza.trazaDTO.error=new ObjectId_NotFound(this.MODULE,id);
		traza.save(); 
		return traza.trazaDTO.error.toString();
	}
	//Id_OnTable buscar por hijos
  let psc= await this.cstvldt.validate_onTable('proyecto_sociocultural_comunitario',{'consejopopular_municipality':id},this.IS_NOT_DELETED)// si esta en BD 
	let ct= await this.cstvldt.validate_onTable('comunidad_transformacion',{'consejopopular_municipality':id},this.IS_NOT_DELETED)// si esta en BD
	let mnc=psc+ct;
    console.log('jihos', mnc);
    if (mnc!=0) { //tienes hijos no te borras  .populate(populate_Municipio)
      let error=new ObjectCanNotDeleted(this.MODULE,mnc) ;
      traza.trazaDTO.error= error ;
      traza.save();
      return error.toString();
    }

    const document = await this.consejopopular_municipality_Model.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true,}
      );
    let codupdate= await this.consejopopular_municipality_Model.findById(id)
    .populate(this.populate_Municipio)    ;

    if (!document) {
      let error=new ErrorX(this.MODULE,'Error inside transaction') ;
      traza.trazaDTO.error= error ;
      traza.save();
      return traza.trazaDTO.error.toString();
    }
	traza.trazaDTO.before=JSON.stringify(cp_municipality_prv);
	traza.trazaDTO.update=JSON.stringify(codupdate);
	traza.trazaDTO.error= 'OK' ;
	traza.save();
  // console.log('del ',document);
  // console.log('find del ',codupdate);
  
    return this.toEntity (codupdate);
  }

  async search(queryDTO:Search_ConsejoPopular_MunicipalityDto):Promise<ConsejoPopular_Municipality_Entity[] | string> {
    //let query= { isDeleted:false};
    if (queryDTO.exactName)  
      queryDTO.name=  "{ $regex:"+queryDTO.name+" , $options:'i'}";
   // if (queryDTO.provinceId!='') { query['province']= queryDTO.provinceId; }
   // if (queryDTO.municipalityId!='') { query['municipality']=queryDTO.municipalityId; }
    const consejopopular_municipalities = await this.consejopopular_municipality_Model
      .find()
      .where(queryDTO)
      .populate(this.populate_Municipio);
    const co_municipalityCollection = consejopopular_municipalities.map((co_municipality) =>
      this.toEntity(co_municipality),
    );
    return co_municipalityCollection;
  }

  private toEntity(co_municipality: ConsejoPopular_Municipality_Document): ConsejoPopular_Municipality_Entity {
    return {
      id: co_municipality._id.toString(),
      name: co_municipality.name,
      municipality:co_municipality.municipality ,     
      province:co_municipality.province,
      createdAt:co_municipality.createdAt,
      updatedAt:co_municipality.updatedAt,
      isDeleted:co_municipality.isDeleted
    };
  }
}


