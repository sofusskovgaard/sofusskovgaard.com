import BaseModel, { IBaseModel } from 'base/model'

import transformer from 'utils/transformer'

class Post extends BaseModel implements IPost {
  title: string
  slug: string
  subtitle: string
  content: string
  release_at: Date

  constructor(attrs: Partial<IPost>) {
    super()
    this.merge(attrs)
  }

  merge(attrs) {
    super.merge(
      transformer(
        {
          release_at: Date,
        },
        attrs,
      ),
    )
  }
}

export default Post

export interface IPost extends IBaseModel {
  title: string
  slug: string
  subtitle: string
  content: string
  release_at: Date | string
}
