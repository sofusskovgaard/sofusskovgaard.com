abstract class BaseModel implements IBaseModel {
  id: number

  merge(attrs) {
    Object.assign(this, attrs)
  }
}

export default BaseModel

export interface IBaseModel {
  id: number
}
