import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

import { DataList } from 'src/modules/common/data-list';
import { ObjectCanNotDeleted, ObjectNotFound } from 'src/modules/common/errors/object-not-found.error';
import { PlaceRepository } from '../domain/repository/place.repository';
import { PlaceDocument, PlaceModel } from './place.schema';
import { CreatePlaceDto } from '../domain/dto/create-place.dto';
import { UpdatePlaceDto } from '../domain/dto/update-place.dto';
import { SearchDuplicate_KeysValue } from 'src/modules/common/errors/duplicated-value.error';
import { Place } from '../domain/entities/place.entity';
import { extractMunicipality } from '../../common/extractors';
import { IsRelationshipProvider } from 'src/modules/common/helpers/customIdValidation';
import { TrazasService } from 'src/cultura/trazas/trazas.service';
import { SearchPlaceDto } from '../domain/dto/search-place.dto';


@Injectable()
export class MongoosePlaceRepository implements PlaceRepository {
  private MODULE = 'Place';
  private IS_NOT_DELETED = { isDeleted: false };
  private POPULATE_QUERY = { path: 'municipality', populate: { path: 'province' } };

private cstvldt: IsRelationshipProvider;
  constructor(
    @InjectModel(PlaceModel.name)
    private placeModel: Model<PlaceModel>,
  @InjectConnection() private cnn: Connection,
  ) { this.cstvldt= new IsRelationshipProvider(this.cnn)}

  async findAll(page: number, pageSize: number): Promise<DataList<Place>|string> {
    const skipCount = (page - 1) * pageSize;

    const places = await this.placeModel.find(this.IS_NOT_DELETED)
        .skip(skipCount)
        .limit(pageSize)
        .populate(this.POPULATE_QUERY)
        .exec();

    const placeCollection = places.map((place) => this.toEntity(place));

    const dataList: DataList<Place> = {
      data: placeCollection,
      totalPages: Math.ceil(placeCollection.length / pageSize),
      currentPage: page,
    };
    return dataList;
  }

  async create(place: CreatePlaceDto, traza:TrazasService): Promise<Place|string> {
    
    let crt_dual=await SearchDuplicate_KeysValue(this.MODULE,this.placeModel,['name','municipalitity'],[place.name,place.municipality],traza)
    
        if (crt_dual.trazaDTO.error !='Ok')       
          return crt_dual.trazaDTO.error.toString();   
        
            try {
              let plc=await new this.placeModel(place).save();
              console.log('save', place);
              
              traza.trazaDTO.update=plc;
              traza.trazaDTO.before=''
              traza.trazaDTO.error='Ok';
              traza.save();             
              let ids=plc._id.toString();
              return await this.findOne(ids);                          
            } 
            catch (error) {
              console.log('error salva crear el lugar',error);            
              traza.trazaDTO.error=error;
              traza.save()
              return error.toString();  
            }         
        
  }

  async findOne(id: string): Promise< Place|string> {
    
    const place = await this.placeModel
      .findById(id)
      .where(this.IS_NOT_DELETED)
      .populate(this.POPULATE_QUERY);
    if (!place) {
      return  (new ObjectNotFound(this.MODULE)).toString();
    }

    return this.toEntity(place);
  }

  async update(place: UpdatePlaceDto, traza:TrazasService): Promise<Place|string> {
    
    let bf=await this.findOne(place.id);
    traza.trazaDTO.before=bf;  
    
    const plc = await this.placeModel.findOneAndUpdate(
      { _id: place.id, ...this.IS_NOT_DELETED },
      place,
      {
        new: true,
        populate: this.POPULATE_QUERY,
      },
    );

    if (!plc) {
      let err=new Error('Problema con actualizacion de lugar ')
        traza.trazaDTO.error=err;
        traza.trazaDTO.update='';
        traza.save()
        return err.toString();
    }
    traza.trazaDTO.update=plc;    
    traza.trazaDTO.error='Ok';
    traza.save()
    return this.toEntity(plc);
  }

  async remove(id: string, traza: TrazasService): Promise<Place|string> {
    let bf=await this.findOne(id);
    // hijos
    let hijos=await this.cstvldt.validate_onTable('entity',{'place':id},this.IS_NOT_DELETED);
    console.log('hijos',hijos);
    if (hijos!=0) { //tienes hijos no te borras  
      let error=new ObjectCanNotDeleted (this.MODULE,hijos);
      traza.trazaDTO.error= error ;
      traza.save();
      return error.toString();
    }
    const plc = await this.placeModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      {
        isDeleted: true,
      },
    );

    if (!plc) {
      let err=new Error('Problema con eliminacion del lugar ')
        traza.trazaDTO.error=err;
        traza.trazaDTO.update='';
        traza.save()
        return err.toString();
    }    
        traza.trazaDTO.update=plc;
        traza.save();       
    return this.toEntity(plc);
  }

  async search(query:SearchPlaceDto):Promise<Place[]|string> {

    const place = await this.placeModel
      .find(query)
      .populate({ path: 'municipality', populate: { path: 'province' } });
    const placeCollection = place.map((municipality) =>
      this.toEntity(municipality)
    );
    return placeCollection;
  }

  private toEntity(place: PlaceDocument): Place {
    return {
      id: place._id.toString(),
      name: place.name,
      updatedAt: place.updatedAt,
      createdAt: place.createdAt,
      municipality: extractMunicipality(place.municipality),
      isDeleted:place.isDeleted
    };
  }
}
