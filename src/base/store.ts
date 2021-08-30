import { makeObservable, observable } from 'mobx'

import RootStore from 'stores'

abstract class BaseStore<HydrationType> implements IBaseStore<HydrationType> {
  root: RootStore

  constructor(root: RootStore) {
    this.root = root

    makeObservable(this, {
      root: observable,
    })
  }

  abstract hydrate(data: HydrationType): void
}

export default BaseStore

export interface IBaseStore<HydrationType> {
  root: RootStore

  hydrate(data: HydrationType): void
}
