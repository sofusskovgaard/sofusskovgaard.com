import React from 'react'
import { observer } from 'mobx-react'
import Link from 'next/link'
import Head from 'next/head'
import dynamic from 'next/dynamic'

// data access
import PrismicService from 'services/prismic-service'
import { Document } from '@prismicio/client/types/documents'

// utils
import { useStores } from 'utils/stores'

// components
const Container = dynamic(() => import('components/container'))

const Sitemap = observer(({ posts }: { posts: Document[] }) => {
  const stores = useStores()
  return (
    <Container>
      <Head>
        <title>Sitemap &mdash; {stores.uiStore.app_name}</title>
      </Head>
      
      <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-max gap-4">
        {posts.map(post => {
          return (
            <div key={post.uid} className="flex items-center justify-center text-center">
              <Link href={`/blog/${post.uid}`}>
                <a className="">
                  {post.data.title[0].text}
                </a>
              </Link>
            </div>
          )
        })}
      </div>
    </Container>
  )
})

export async function getStaticProps() {
  const posts = await PrismicService.getBlogPosts(null, null)
  return {
    props: {
      posts
    },
  }
}

export default Sitemap
