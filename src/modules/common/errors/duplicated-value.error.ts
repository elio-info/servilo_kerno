import { Model } from "mongoose";
import { TrazasService } from "src/cultura/trazas/trazas.service";

export class DuplicatedValueError extends Error {
  constructor(message: string) {
    super(`Duplicated key on ${message} colection`);
  }
}

/**
 * This TypeScript function searches for duplicate values in a specified module based on the provided
 * attributes and values.
* @param mod - `mod` is a Mongoose model representing a collection in a MongoDB database.
 * @param att_2_compare - The `att_2_compare` parameter is used to specify the attribute of the data
 * object that you want to compare with the `value_2_compare` parameter.
 * @param value_2_compare - The `value_2_compare` parameter is the value that will be compared to the
 * attribute specified by the `att_2_compare` parameter in the documents retrieved from the database.
 * It will be trimmed and converted to lowercase before comparison.
 * @returns The function `SearchDuplicateValue` is returning a `Promise` that resolves to either a
 * `Document` or a boolean value. In the provided code snippet, the function is currently returning
 * `false`.
 * aqui estoy entrando los datos y verificar que no dupliquen
 */
export async function SearchDuplicateValue(module,model ,att_2_compare,value_2_compare, traza:TrazasService):Promise <TrazasService>{
  let		qwerty={};
  att_2_compare.map((data,indx)=>{ qwerty[data]=value_2_compare[indx]; console.log('json',qwerty);})
  let todos= await Promise.all([model
                              .find(qwerty)
                              .exec()]
                            )
  // console.log('buscar -',todos);  
  if(todos.length>0)  
    { 
      let err=new DuplicatedValueError( module);
      traza.trazaDTO.error=err;
      traza.trazaDTO.before='';
      traza.trazaDTO.update='';
      traza.save();      
    }
    return traza;     
}
export async function IdeaVieja_SearchDuplicateValue(mod ,att_2_compare,value_2_compare, traza:TrazasService):Promise <TrazasService>{
  let todos= await Promise.all([mod
                              .find({})
                              .exec()]
                            )
  // console.log('buscar -',todos);  
  return todos[0].filter((data)=> {
      // console.log('buscar - todos ',data,att_2_compare,data[att_2_compare]);
    // moverme por los elementos a comparar, al primero me voy
    let coincidencias=0;
    att_2_compare.map((att_2_compar,indx) =>{
      if (data[att_2_compar].trim().toLowerCase() ==value_2_compare[indx].trim().toLowerCase()) {
        // comparando todo lo que tengo que comparar
        console.log('att_2_compar',att_2_compar);
        console.log('value_2_compare',value_2_compare[indx]);      
        coincidencias++
      };
    } )
    if(coincidencias==att_2_compare.length)  
    { 
      let err=new DuplicatedValueError(  + ' -> ' + mod.name);
      traza.trazaDTO.error=err;
      traza.trazaDTO.before='';
      traza.trazaDTO.update='';
      traza.save();
      
    }
    return traza;     
})
}