import { action, makeObservable, observable, when } from 'mobx'
import getConfig from "next/config"

import Prismic from '@prismicio/client'
import { Document } from '@prismicio/client/types/documents'
import ApiSearchResponse from '@prismicio/client/types/ApiSearchResponse'
import { QueryOptions } from '@prismicio/client/types/ResolvedApi'

class PrismicService {
  serverRuntimeConfig = getConfig().serverRuntimeConfig

  blog_posts: Document[] = []

  loading = false
  loaded = false

  constructor() {
    makeObservable(this, {
      blog_posts: observable,
      loading: observable,
      loaded: observable,

      getAllBlogPosts: action,
      getLatestBlogPosts: action,
      getBlogPosts: action,
      getBlogPost: action,
    })

    this.getAllBlogPosts()
  }

  //#region Blog posts

  async getAllBlogPosts(): Promise<void> {
    this.loading = true
    
    const results = await this._getAllOfType(Prismic.Predicates.at('document.type', 'blog_post'))

    results.forEach(item => this.blog_posts.push(item))

    this.loading = false
    this.loaded = true
  }

  async getLatestBlogPosts(id: string, pageSize: number = 3): Promise<Document[]> {
    const response = await this._getManyOfType(Prismic.Predicates.at('document.type', 'blog_post'), null, 1, pageSize+1)
    return response.results.filter((post) => post.id !== id).slice(0, pageSize)
  }

  async getBlogPosts(page: number = 1, pageSize: number = 20): Promise<Document[] | ApiSearchResponse> {
    if (page == null && pageSize == null) {
      const response = await this._getAllOfType(Prismic.Predicates.at('document.type', 'blog_post'))
      return response
    }
    const response = await this._getManyOfType(Prismic.Predicates.at('document.type', 'blog_post'), null, page, pageSize)
    return response
  }

  async getBlogPost(uid: string): Promise<Document> {
    const response = await this._getOneOfType([
      Prismic.Predicates.at('document.type', 'blog_post'),
      Prismic.Predicates.at('my.blog_post.uid', uid)
    ])
    return response
  }

  async getNextBlogPost(id: string): Promise<Document> {
    const response = await this._getManyOfType([
      Prismic.Predicates.at('document.type', 'blog_post')
    ], {
      orderings: '[document.first_publication_date]',
      after: id
    }, 1, 1)
    return response.results[0] ?? null
  }

  async getPreviousBlogPost(id: string): Promise<Document> {
    const response = await this._getManyOfType([
      Prismic.Predicates.at('document.type', 'blog_post')
    ], {
      after: id
    }, 1, 1)
    return response.results[0] ?? null
  }

  //#endregion

  //#region Work experience

  async getWorkExperience(): Promise<ApiSearchResponse> {
    const response = await this._getManyOfType(Prismic.Predicates.at('document.type', 'work_experience'), null, 1, 100)
    return response
  }

  //#endregion

  //#region Education

  async getEducation(): Promise<ApiSearchResponse> {
    const response = await this._getManyOfType(Prismic.Predicates.at('document.type', 'education'), null, 1, 100)
    return response
  }

  //#endregion

  //#region Introduction

  async getIntroduction(): Promise<Document> {
    const response = await this._getOneOfType(Prismic.Predicates.at('document.type', 'introduction'))
    return response
  }

  //#endregion

  //#region Categories
  
  async getCategories(): Promise<ApiSearchResponse> {
    const response = await this._getManyOfType(Prismic.Predicates.at('document.type', 'category'), null, 1, 100)
    return response
  }

  //#endregion

  private _createAPIClient() {
    return Prismic.client(this.serverRuntimeConfig.PRISMIC_URL + "/api/v2")
  }

  private async _getOneOfType(query: string | string[], options: QueryOptions = null) {
    const client = this._createAPIClient()
    const response = await client.queryFirst(query, options)
    return response
  }

  private async _getManyOfType(query: string | string[], options: QueryOptions = null, page: number = 1, pageSize: number = 10) {
    const client = this._createAPIClient()
    const response = await client.query(query, { orderings: '[document.first_publication_date desc]', page, pageSize, ...options })
    return response
  }

  private async _getAllOfType(query: string | string[]) {
    const results: Document[] = []

    let response = await this._getManyOfType(query, null, 1, 100)
    response.results.forEach(result => results.push(result))

    while (response.total_pages > response.page) {
      response = await this._getManyOfType(query, null, response.page + 1, 100)
      response.results.forEach(result => results.push(result))
    }

    return results
  }
}

const prismicService = new PrismicService()
export default prismicService
