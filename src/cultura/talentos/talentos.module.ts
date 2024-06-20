import { Module } from '@nestjs/common';
import { Talento_Artistico_Controller } from './infrastructura/talentos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Talento_Artistico_Model, Talento_Artistico_Schema } from './schemas/talentos.schema';
import { Talento_Artistico_Service } from './infrastructura/talentos.service';

@Module({
    imports:[
        MongooseModule.forFeature(
            [
                {
                    name:Talento_Artistico_Model.name,
                    schema:Talento_Artistico_Schema
                }
            ]
        )
    ],
    controllers:[
        Talento_Artistico_Controller
    ],
    providers:[ Talento_Artistico_Service]
})
export class Talento_Artistico_Module {}
