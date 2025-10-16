import { Module } from '@nestjs/common';
import { Nomencladores_Generales } from './infrastructure/codificadores_nomencladores.controller';

@Module({  
  controllers:[ Nomencladores_Generales
  ],  
})
export class Nomencla_CodificadoresCulturales_Module {}
