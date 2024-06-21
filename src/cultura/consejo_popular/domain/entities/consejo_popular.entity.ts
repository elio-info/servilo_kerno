export class ConsejoPopular_Municipality_Entity {
  id: string;
  name: string;
  isDeleted:boolean
  createdAt: Date;
  updatedAt: Date;
  municipality: string // ObjectId Municipality;
  province: string // ObjectId Province;
}
