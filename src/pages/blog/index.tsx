import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { NextPageContext } from 'next'
import Link from 'next/link'

import PrismicService from 'services/prismic-service'
import { useStores } from 'utils/stores'

// Components
const Container = dynamic(() => import('components/container'))
const Post = dynamic(() => import('components/post'))

const Blog = observer(({ posts, categories }: { posts: any[]; categories: any[] }) => {
  const stores = useStores()
  const router = useRouter()

  const filteredPosts = useCallback(
    () =>
      posts.filter(
        (post) =>
          post.categories != null && post.categories.some((item) => item.category._meta.uid === router.query['tag']),
      ),
    [router.query['tag']],
  )

  return (
    <Container>
      <Head>
        <title>Blog &mdash; {stores.uiStore.app_name}</title>
      </Head>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold mr-4">Blog</h1>
        <h3 className="font-mono my-4">I hope you find something useful.</h3>
      </div>
      {categories != null && (
        <div className="flex items-center justify-start flex-wrap gap-1 my-4">
          {categories.map((item) => (
            <Link href={`/blog?tag=${item._meta.uid}`}>
              <a className="text-xs rounded px-2 py-1 bg-white">{item.name}</a>
            </Link>
          ))}
        </div>
      )}

      {(router.query['tag'] != null ? filteredPosts() : posts).map((post) => (
        <Post
          key={post._meta.id}
          uid={post._meta.uid}
          title={post.title[0].text}
          subtitle={post.subtitle[0].text}
          published_at={new Date(post._meta.firstPublicationDate)}
          categories={post.categories}
        />
      ))}
      {router.query['tag'] != null && filteredPosts().length == 0 && (
        <div className="flex items-center justify-center">
          <p className="my-10">There are no posts with that tag.</p>
        </div>
      )}
    </Container>
  )
})

export async function getStaticProps(context: NextPageContext) {
  const posts = await PrismicService.getBlogPosts(null, null)
  const categories = await PrismicService.getCategories()
  return {
    props: {
      posts,
      categories,
    },
  }
}

export default Blog
