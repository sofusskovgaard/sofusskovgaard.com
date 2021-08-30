import UIStore, { UIStoreHydration } from './ui-store'
import SessionStore, { SessionStoreHydration } from './session-store'
import PostsStore, { PostsStoreHydration } from './posts-store'
import ReposStore, { ReposStoreHydration } from './repos-store'

class RootStore implements IRootStore {
  uiStore: UIStore
  sessionStore: SessionStore
  postsStore: PostsStore
  reposStore: ReposStore

  constructor() {
    this.uiStore = new UIStore(this)
    this.sessionStore = new SessionStore(this)
    this.postsStore = new PostsStore(this)
    this.reposStore = new ReposStore(this)
  }

  hydrate(data: RootStoreHydration) {}
}

export default RootStore

export interface IRootStore {
  uiStore: UIStore
  sessionStore: SessionStore
  postsStore: PostsStore
  reposStore: ReposStore
}

export type RootStoreHydration = {
  uiStore?: UIStoreHydration
  sessionStore?: SessionStoreHydration
  postsStore?: PostsStoreHydration
  reposStore?: ReposStoreHydration
}
