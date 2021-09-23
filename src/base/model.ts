import { Document } from "@prismicio/client/types/documents"
import { observable, makeObservable, action } from "mobx"
import hash from "utils/hashing"

abstract class BaseModel implements IBaseModel {
  id: string
  uid: string
  first_publication_date: string
  last_publication_date: string

  merge(attrs: Partial<Document>) {
    this.id = attrs.id
    this.uid = attrs.uid
    this.first_publication_date = attrs.first_publication_date
    this.last_publication_date = attrs.last_publication_date
  }
}

export default BaseModel

export interface IBaseModel {
  id: string
  uid: string
  first_publication_date: string
  last_publication_date: string
}
