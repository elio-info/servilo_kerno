export class Categorie_Entity {
  id: string;
  name: string;//nombre del modulo
  nameTitle: string; //título que se pondrá en el menú
  link: string; //dcc del vínculo de acceso al modulo
  access_point: API_Struct[];
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class API_Struct
{
	nameAPI: 'Post' | 'Delete' | 'Put' | 'Get' | 'Patch' ;//post,get,put,etc
	linkAPI: string;// dcc
	nameMenuTitle: string;// nombre
	isActive: boolean;// si / no
}
