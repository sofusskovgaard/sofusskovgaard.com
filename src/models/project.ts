import BaseModel, { IBaseModel } from 'base/model'

class Project extends BaseModel implements IProject {
  name: string
  description: string
  stars: number
  commits: number
  branches: number

  constructor(attrs: Partial<IProject> = null) {
    super()
    
    this.merge(attrs)
  }

  merge(attrs) {
    super.merge(attrs)
  }
}

export default Project

export interface IProject extends IBaseModel {
  name: string
  description: string
  stars: number
  commits: number
  branches: number
}
