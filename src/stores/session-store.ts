import { makeObservable, observable, computed, action } from 'mobx'

import RootStore from 'stores'
import BaseStore from 'base/store'

class SessionStore extends BaseStore<SessionStoreHydration> implements ISessionStore {
  logged_in: boolean = false

  constructor(root: RootStore) {
    super(root)
    
    makeObservable(this, {
      logged_in: observable,

      hydrate: action,

      isAdmin: computed
    })
  }

  hydrate(data: SessionStoreHydration): void {}

  get isAdmin(): boolean {
    return true
  }
}

export default SessionStore

export interface ISessionStore {
  logged_in: boolean
}

export type SessionStoreHydration = {}
