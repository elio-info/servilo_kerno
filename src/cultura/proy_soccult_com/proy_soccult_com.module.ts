import { Module } from '@nestjs/common';
import { Proyecto_Sociocultural_Comunitario_Service } from './proy_soccult_com.service';
import { Proyecto_Sociocultural_Comunitario_Controller } from './proy_soccult_com.controller';

@Module({
  
  controllers: [Proyecto_Sociocultural_Comunitario_Controller],
  providers: [Proyecto_Sociocultural_Comunitario_Service]
})
export class Proyecto_Sociocultural_Comunitario_Module {}
