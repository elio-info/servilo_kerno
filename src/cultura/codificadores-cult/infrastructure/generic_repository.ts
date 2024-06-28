import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class Generic_Repository{

    private readonly repository;
    
    constructor(  tablModel:string){
       // @InjectModel(tablModel).arguments(this.repository).exec() 
    }
}