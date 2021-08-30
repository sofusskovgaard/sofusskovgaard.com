import { makeObservable, observable, action } from 'mobx'

import RootStore from 'stores'
import BaseStore from 'base/store'

import Post from 'models/post'

class PostsStore extends BaseStore<PostsStoreHydration> implements IPostsStore {
  items: Post[]

  constructor(root: RootStore) {
    super(root)
    
    makeObservable(this, {
      items: observable,
      hydrate: action
    })
  }

  hydrate(data: PostsStoreHydration): void {}
}

export default PostsStore

export interface IPostsStore {
}

export type PostsStoreHydration = {}
