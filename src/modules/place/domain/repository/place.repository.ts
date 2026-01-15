import { DataList } from 'src/modules/common/data-list';
import { CreatePlaceDto } from '../dto/create-place.dto';
import { UpdatePlaceDto } from '../dto/update-place.dto';
import { Place } from '../entities/place.entity';
import { TrazasService } from 'src/cultura/trazas/trazas.service';

export interface PlaceRepository {
  findAll: (page: number, pageSize: number) => Promise<DataList<Place>|string>;
  create: (place: CreatePlaceDto, traza:TrazasService) => Promise<Place|string>;
  findOne: (id: string) => Promise<Place|string>;
  update: ( place: UpdatePlaceDto, traza:TrazasService) => Promise<Place|string>;
  remove: (id: string, traza:TrazasService) => Promise<Place|string>;
  search: (query) => Promise<Place[]|string>;
}
