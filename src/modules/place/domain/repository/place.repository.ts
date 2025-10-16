import { DataList } from 'src/modules/common/data-list';
import { CreatePlaceDto } from '../dto/create-place.dto';
import { UpdatePlaceDto } from '../dto/update-place.dto';
import { Place } from '../entities/place.entity';

export interface PlaceRepository {
  findAll: (page: number, pageSize: number) => Promise<DataList<Place>>;
  create: (place: CreatePlaceDto) => Promise<void>;
  findOne: (id: string) => Promise<Place>;
  update: (id: string, place: UpdatePlaceDto) => Promise<Place>;
  remove: (id: string) => Promise<void>;
  search: (query) => Promise<Place[]>;
}
