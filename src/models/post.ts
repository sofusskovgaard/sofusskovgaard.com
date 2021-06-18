import BaseModel, { IBaseModel } from 'base/model'

import transformer from 'utils/transformer'

class Post extends BaseModel implements IPost {
  title: string
  subtitle: string
  releaseTs: Date

  constructor(attrs: Partial<IPost>) {
    super()
    this.merge(attrs)
  }

  merge(attrs) {
    super.merge(
      transformer(
        {
          releaseTs: Date,
        },
        attrs,
      ),
    )
  }
}

export default Post

export interface IPost extends IBaseModel {
  title: string
  subtitle: string
  releaseTs: Date | string
}
