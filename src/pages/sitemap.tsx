import React from 'react'
import { observer } from 'mobx-react'
import Link from 'next/link'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Document } from '@prismicio/client/types/documents'
import { GetStaticPropsResult } from 'next'

// data access
import PrismicService from 'services/prismic-service'

// utils
import { useStores } from 'utils/stores'

// components
const Container = dynamic(() => import('components/container'))

const Sitemap = observer(({ posts }: Props) => {
  const stores = useStores()
  return (
    <Container>
      <Head>
        <title>Sitemap &mdash; {stores.uiStore.app_name}</title>
        <meta name="robots" content="noindex" />
      </Head>

      <ul className="flex flex-col list-disc">
        <li>
          <Link href="/">
            <a>Index</a>
          </Link>
        </li>
        <li>
          <Link href="/blog">
            <a>Blog</a>
          </Link>
          {posts.length > 0 && (
            <ul className="flex flex-col pl-4 list-disc">
              {posts.map((post) => {
                return (
                  <li key={post.uid}>
                    <Link href={`/blog/${post.uid}`}>
                      <a>{post.data.title[0].text}</a>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </li>
        <li>
          <Link href="/contact">
            <a>Contact</a>
          </Link>
        </li>
      </ul>
    </Container>
  )
})

type Props = {
  posts: Document[]
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const posts = (await PrismicService.getBlogPosts(null, null)) as Document[]
  return {
    props: {
      posts,
    },
    revalidate: 60,
  }
}

export default Sitemap
