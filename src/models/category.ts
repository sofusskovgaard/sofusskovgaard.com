import BaseModel, { IBaseModel } from "base/model"
import { Document } from "@prismicio/client/types/documents"

class Category extends BaseModel implements ICategory {
  name: string

  constructor(attrs: Partial<Document>) {
    super()
    this.merge(attrs)
  }

  override merge(attrs: Partial<Document>) {
    super.merge(attrs)
    this.name = attrs.data.name
  }
}

export default Category

export interface ICategory extends IBaseModel {
  name: string
}