import { makeObservable, observable, action } from 'mobx'

import RootStore from 'stores'
import BaseStore from 'base/store'

class UIStore extends BaseStore<UIStoreHydration> implements IUIStore {
  app_name: string = "Sofus Skovgaard"

  dynamic_navbar: boolean = false
  dynamic_navbar_toggled: boolean = false

  constructor(root: RootStore) {
    super(root)
    
    makeObservable(this, {
      app_name: observable,
      dynamic_navbar: observable,
      dynamic_navbar_toggled: observable,
      hydrate: action
    })
  }

  hydrate(data: UIStoreHydration): void {}
}

export default UIStore

export interface IUIStore {
  app_name: string
}

export type UIStoreHydration = {}
