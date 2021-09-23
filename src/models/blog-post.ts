import BaseModel, { IBaseModel } from "base/model"
import { Document } from "@prismicio/client/types/documents"
import Category from "./category"

class BlogPost extends BaseModel implements IBlogPost {
  title: string
  subtitle: string
  content: any
  thumbnail: {
    url: string
    alt: string
    width: number
    height: number
  }
  categories: Category[] = []

  constructor(attrs: Partial<Document>) {
    super()
    this.merge(attrs)
  }

  override merge(attrs: Partial<Document>) {
    super.merge(attrs)
    this.title = attrs.data.title
    this.subtitle = attrs.data.subtitle
    this.content = attrs.data.content
    this.thumbnail = attrs.data.thumbnail
  }
}

export default BlogPost

export interface IBlogPost extends IBaseModel {
  title: string
  subtitle: string
  content: any
  thumbnail: {
    url: string
    alt: string
    width: number
    height: number
  }
  categories: Category[]
}