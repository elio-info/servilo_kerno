import { Categorie_Entity } from "src/modules/categorie/domain/entities/categorie.entity";

export class Charge_Entity {
  id: string;
  name: string;//nombre del cargo que se ocupa en la entidad
  entity:string;//entidad
  //acceso que tiene en ese cargo, funcionalidades a las que puede acceder
  access: Categorie_Entity[ //puntos de categorías que puede hacer 
    ]
  subord: string[ //entidades id 
   ] //entidades en las que puedo transformar
  isDeleted:boolean;
  createdAt: Date;
  updatedAt: Date;
}
