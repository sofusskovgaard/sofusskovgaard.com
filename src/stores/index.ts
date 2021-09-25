import UIStore, { UIStoreHydration } from './ui-store'

class RootStore implements IRootStore {
  uiStore: UIStore

  constructor() {
    this.uiStore = new UIStore(this)
  }

  hydrate(data: RootStoreHydration) {}
}

export default RootStore

export interface IRootStore {
  uiStore: UIStore
}

export type RootStoreHydration = {
  uiStore?: UIStoreHydration
}
