import { Model } from "mongoose";

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
 */
export async function SearchDuplicateValue(mod ,att_2_compare,value_2_compare):Promise <Document[]>{
  let todos= await Promise.all([mod
                              .find({})
                              .exec()]
                            )
  // console.log('buscar -',todos);  
  return todos[0].filter((data)=> {
      // console.log('buscar - todos ',data,att_2_compare,data[att_2_compare]);
    return (data[att_2_compare].trim().toLowerCase() ==value_2_compare.trim().toLowerCase());
})
}
