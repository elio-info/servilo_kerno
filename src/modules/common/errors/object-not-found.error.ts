export class ObjectNotFound extends Error {
  constructor(type?: string) {
    super(type ? `Object of type ${type} not found` : 'Object not found');
  }
}
export class ObjectId_NotFound extends Error {
  constructor(module_owner: string,module_id: string) {
    super();
    this.name='Objeto no se encuentra';
    this.message=`${module_owner} no contiene id ${module_id}`;
  }
}
export class ObjectCanNotDeleted extends Error {
  constructor(module_owner: string,module_id: string,hijos=1) {
    super();
    this.name='Objeto no se puede eliminar';
    this.message=`${module_owner} con id ${module_id},no se puede eliminar, contiene ${hijos} dependientes`;
  }
}

export class ErrorX extends Error {
  constructor(module_owner: string,module_mess) {
    super();
    this.name='Error sistema';
    this.message=`${module_owner} tuvo error ${module_mess}`;
  }
}