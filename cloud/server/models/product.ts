import {DataObject} from "../core/DataObject";
export class Product extends DataObject {
  _id: string;
  name: string;
  versions: ProductVersion[];
  created_at: Date;
  updated_at: Date;
}

export interface ProductVersion {
  name: string;
  version: string;
  created_at: Date;
  updated_at: Date;
}
