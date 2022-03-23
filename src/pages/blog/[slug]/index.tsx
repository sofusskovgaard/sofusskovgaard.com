import React from 'react'
import Head from 'next/head'
import { observer } from 'mobx-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Document } from '@prismicio/client/types/documents'
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next'
import { RichText } from 'prismic-reactjs'

import PrismicService from 'services/prismic-service'

// utils
import { useStores } from 'utils/stores'
import { formatLongDate } from 'utils/date-format'
import { useRouter } from 'next/router'

// Components
const Container = dynamic(() => import('components/container'))
const Post = dynamic(() => import('components/post'))

const BlogPost = observer(({ post, latestPosts, nextPost, prevPost }: Props) => {
  const stores = useStores()
  const router = useRouter()

  if (router.isFallback) {
    return <p>loading...</p>
  }

  return (
    <Container>
      <Head>
        <title>
          {post.data.title[0].text} &mdash; {stores.uiStore.app_name}
        </title>
        <meta name="keywords" content={post.data.seo_keys} />
        <meta name="description" content={post.data.seo_description} />

        <meta name="twitter:card" content={post.data.seo_description} />
        <meta name="twitter:title" content={post.data.title[0].text} />
        <meta name="twitter:description" content={post.data.seo_description} />
        <meta name="twitter:creator" content="@sofusskovgaard" />
        {post.data.thumbnail.url != null && <meta name="twitter:image:src" content={post.data.thumbnail.url} />}

        <meta property="og:title" content={post.data.title[0].text} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://sofusskovgaard.com/blog/${post.uid}`} />
        {post.data.thumbnail.url != null && <meta property="og:image" content={post.data.thumbnail.url} />}
        <meta property="og:description" content={post.data.seo_description} />
        <meta property="article:published_time" content={new Date(post.first_publication_date).toISOString()} />
      </Head>

      <div className="flex flex-col gap-4">
        {(nextPost != null || prevPost != null) && (
          <div className="flex">
            {nextPost != null && (
              <Link href={`/blog/${nextPost.uid}`}>
                <a className="text-gray-600 hover:text-black hover:underline text-sm">&#8592; Next post</a>
              </Link>
            )}
            {prevPost != null && (
              <Link href={`/blog/${prevPost.uid}`}>
                <a className="text-gray-600 hover:text-black hover:underline text-sm ml-auto">Previous post &#8594;</a>
              </Link>
            )}
          </div>
        )}
        <div>
          <p className="block font-semibold text-gray-500">{formatLongDate(post.first_publication_date)}</p>
          <h1 className="text-2xl md:text-4xl font-extrabold mb-2">{post.data.title[0].text}</h1>
          <p className="text-sm text-gray-600">{post.data.subtitle[0].text}</p>
        </div>

        {/* <hr className="mt-4 mb-6 md:my-10" /> */}
        {post.data.thumbnail.url != null && (
          <img className="w-full rounded" src={post.data.thumbnail.url} alt={post.data.thumbnail.alt} />
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-10 items-start">
        <section className="prose flex-2">{RichText.render(post.data.content)}</section>
        <section className="sticky top-4 flex-1">
          <aside>
            <div className="p-4">
              <h3 className="font-bold text-2xl">Latest posts</h3>
              <small className="hidden md:block">
                Feel free to keep browsing, here are some of my latest posts. You might find something interesting.
              </small>
            </div>

            {latestPosts.map((p) => (
              <Post key={p.id} doc={p} hideThumbnail />
            ))}
          </aside>
        </section>
      </div>
    </Container>
  )
})

type Props = {
  post: Document
  latestPosts: Document[]
  nextPost: Document | null
  prevPost: Document | null
}

export async function getStaticProps(ctx: GetStaticPropsContext): Promise<GetStaticPropsResult<Props>> {
  const post = await PrismicService.getBlogPost(ctx.params['slug'] as string)

  if (post == null)
    return {
      notFound: true,
    }

  const results = await Promise.all([
    PrismicService.getLatestBlogPosts(post.id),
    PrismicService.getNextBlogPost(post.id),
    PrismicService.getPreviousBlogPost(post.id),
  ])

  return {
    props: {
      post,
      latestPosts: results[0],
      nextPost: results[1],
      prevPost: results[2],
    },
    revalidate: 60,
  }
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const posts = (await PrismicService.getBlogPosts(null, null)) as Document[]
  return {
    paths: posts.map((post) => ({ params: { slug: post.uid } })),
    fallback: 'blocking',
  }
}

export default BlogPost
