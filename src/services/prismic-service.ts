import { action, makeObservable, observable, when } from 'mobx'

import { PrismicLink } from 'apollo-link-prismic'
import { ApolloClient, DocumentNode, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import gql from 'graphql-tag'

class PrismicService {
  blog_posts = []

  gqlClient: ApolloClient<NormalizedCacheObject>

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

    this.gqlClient = new ApolloClient<NormalizedCacheObject>({
      ssrMode: typeof window === 'undefined',
      link: PrismicLink({
        uri: process.env.PRISMIC_URL + '/graphql',
      }),
      cache: new InMemoryCache(),
    })

    this.getAllBlogPosts()
  }

  //#region Blog posts

  async getAllBlogPosts(): Promise<void> {
    this.loading = true
    const results = await this._getAllOfType(
      (after) => gql`
        query { 
          allBlog_posts(sortBy: meta_firstPublicationDate_DESC, first: 20${after != null ? `, after: "${after}"` : ''}) {
            totalCount
            pageInfo {
              hasPreviousPage
              hasNextPage
              startCursor
              endCursor
            }
            edges {
              node {
                _meta {
                  id
                  uid
                  firstPublicationDate
                  lastPublicationDate
                }
                title
                subtitle
                content
                thumbnail
                seo_keys
                seo_description
                categories {
                  category {
                    __typename
                    ... on Category {
                      _meta {
                        id
                        uid
                        firstPublicationDate
                        lastPublicationDate
                      }
                      name
                    }
                  }
                }
              }
            }
          }
        }
      `,
    )
    results.forEach(item => this.blog_posts.push(item))
    this.loading = false
    this.loaded = true
  }

  async getLatestBlogPosts(id: string, pageSize: number = 3): Promise<any> {
    await when(() => this.loaded)

    return this.blog_posts.filter((post) => post._meta.id !== id).slice(0, 2)
  }

  async getBlogPosts(page: number = 1, pageSize: number = 20): Promise<any> {
    await when(() => this.loaded)

    if (page == null && pageSize == null) return this.blog_posts
    return this.blog_posts.slice(page > 1 ? (page - 1) * pageSize : 0, page * pageSize)
  }

  async getBlogPost(uid: string): Promise<any> {
    await when(() => this.loaded)

    return this.blog_posts.find((post) => post._meta.uid == uid)
  }

  async getNextBlogPost(id: string): Promise<any | null> {
    await when(() => this.loaded)
    const index = this.blog_posts.findIndex((post) => post._meta.id == id)

    return index > 0 ? this.blog_posts[index - 1] : null
  }

  async getPreviousBlogPost(id: string): Promise<any | null> {
    await when(() => this.loaded)
    var index = this.blog_posts.findIndex((post) => post._meta.id == id)
    return index < this.blog_posts.length - 1 ? this.blog_posts[index + 1] : null
  }

  //#endregion

  //#region Work experience

  async getWorkExperience() {
    const results = await this._getAllOfType(
      (after) => gql`
        query { 
          allWork_experiences(first: 20${after != null ? `, after: "${after}"` : ''}) {
            totalCount
            pageInfo {
              hasPreviousPage
              hasNextPage
              startCursor
              endCursor
            }
            edges {
              node {
                _meta {
                  id
                  uid
                  firstPublicationDate
                  lastPublicationDate
                }
                job_title
                description
                company
                company_url {
                  __typename
                  ... on _ExternalLink {
                    url
                    target
                  }
                }
                started
                stopped
              }
            }
          }
        }
      `,
    )
    return results
  }

  //#endregion

  //#region Introduction

  async getIntroduction() {
    const results = this._getAllOfType(() => gql`
      query { 
        allIntroductions {
          totalCount
          pageInfo {
            hasPreviousPage
            hasNextPage
            startCursor
            endCursor
          }
          edges {
            node {
              _meta {
                id
                uid
                firstPublicationDate
                lastPublicationDate
              }
              title
              subtitle
              introduction
              portrait
            }
          }
        }
      }
    `)
    return results
  }

  //#endregion

  //#region Categories
  
  async getCategories() {
    const results = this._getAllOfType(() => gql`
      query { 
        allCategorys {
          totalCount
          pageInfo {
            hasPreviousPage
            hasNextPage
            startCursor
            endCursor
          }
          edges {
            node {
              _meta {
                id
                uid
                firstPublicationDate
                lastPublicationDate
              }
              name
            }
          }
        }
      }
    `)
    return results
  }

  //#endregion

  private async _getAllOfType(query: (after?: string) => DocumentNode) {
    const results = []

    let _result = await this.gqlClient.query({
      query: query(),
    })
    let key = Object.keys(_result.data)[0]

    _result.data[key].edges.forEach((edge) => results.push(edge.node))

    while (_result.data[key].pageInfo.hasNextPage) {
      _result = await this.gqlClient.query({
        query: query(_result.data[key].pageInfo.endCursor),
      })

      _result.data[key].edges.forEach((edge) => results.push(edge.node))
    }

    return results
  }
}

const prismicService = new PrismicService()
export default prismicService
