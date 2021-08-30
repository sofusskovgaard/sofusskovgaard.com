import { makeObservable, observable, computed, action } from 'mobx'

import RootStore from 'stores'
import BaseStore from 'base/store'

import Repo from 'models/repository'

class ReposStore extends BaseStore<ReposStoreHydration> implements IReposStore {
  items: Repo[]

  constructor(root: RootStore) {
    super(root)
    
    makeObservable(this, {
      items: observable,
      hydrate: action
    })
  }

  hydrate(data: ReposStoreHydration): void {}
}

export default ReposStore

export interface IReposStore {
}

export type ReposStoreHydration = {}
