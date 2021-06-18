import BaseModel, { IBaseModel } from 'base/model'

import transformer from 'utils/transformer'

class Repository extends BaseModel implements IRepository {
  name: string
  full_name: string
  description: string
  stargazers_count: number
  watchers_count: number
  forks_count: number
  created_at: Date

  constructor(attrs: Partial<IRepository> = null) {
    super()

    this.merge(attrs)
  }

  merge(attrs) {
    super.merge(
      transformer(
        {
          created_at: Date,
        },
        attrs,
      ),
    )
  }
}

export default Repository

export interface IRepository extends IBaseModel {
  name: string
  full_name: string
  description: string
  stargazers_count: number
  watchers_count: number
  forks_count: number
  created_at: Date
}
