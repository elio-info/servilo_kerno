import { ObjectId } from "mongoose";

export interface PersonAuth {
  sub: string;
  username: string;
  hashPassword: string;
  rol:string;
}
