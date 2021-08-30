import React from 'react'
import Head from 'next/head'
import { observer } from 'mobx-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

import PrismicService from 'services/prismic-service'
import { RichText } from 'prismic-reactjs'

// utils
import { useStores } from 'utils/stores'
import { formatLongDate } from 'utils/date-format'
import styled from 'styled-components'

// Components
const Container = dynamic(() => import('components/container'))
const Post = dynamic(() => import('components/post'))

const BlogPost = observer(
  ({
    post,
    latestPosts,
    nextPost,
    prevPost,
  }: {
    post: any
    latestPosts: any[]
    nextPost: any | null
    prevPost: any | null
  }) => {
    const stores = useStores()
    return (
      <Container>
        <Head>
          <title>
            {post.title[0].text} &mdash; {stores.uiStore.app_name}
          </title>
          <meta name="description" content={post.seo_description} />
          <meta name="keywords" content={post.seo_keys} />
          <meta name="author" content="Sofus Skovgaard" />
        </Head>
        {(nextPost != null || prevPost != null) && (
          <div className="flex mb-6">
            {nextPost != null && (
              <Link href={`/blog/${nextPost._meta.uid}`}>
                <a className="text-gray-600 hover:text-black hover:underline text-sm">&#8592; Next post</a>
              </Link>
            )}
            {prevPost != null && (
              <Link href={`/blog/${prevPost._meta.uid}`}>
                <a className="text-gray-600 hover:text-black hover:underline text-sm ml-auto">Previous post &#8594;</a>
              </Link>
            )}
          </div>
        )}
        <p className="block font-semibold text-gray-500">
          {formatLongDate(post._meta.firstPublicationDate)}
        </p>
        <h1 className="text-2xl md:text-4xl font-extrabold mb-4">{post.title[0].text}</h1>
        <p className="mb-4 text-sm text-gray-600">{post.subtitle[0].text}</p>
        {post.categories != null && (
          <div className="flex items-center justify-start flex-wrap gap-1 my-4">
            {post.categories.map((item) => (
              <Link href={`/blog?tag=${item.category._meta.uid}`}>
                <a className="text-xs rounded px-2 py-1 bg-white">{item.category.name}</a>
              </Link>
            ))}
          </div>
        )}
        {/* <hr className="mt-4 mb-6 md:my-10" /> */}
        {post.thumbnail != null && (
          <img className="w-full rounded" src={post.thumbnail.url} alt={post.thumbnail.alt} />
        )}
        <Grid className="gap-10 items-start mt-10">
          <section className="prose !max-w-full !w-full">{RichText.render(post.content)}</section>
          <section className="sticky top-4">
            <aside>
              <div className="p-4">
                <h3 className="font-bold text-2xl">Latest posts</h3>
                <small className="hidden md:block">
                  Feel free to keep browsing, here are some of my latest posts. You might find something interesting.
                </small>
              </div>

              {latestPosts.map((p) => (
                <Post
                  key={p.id}
                  uid={p._meta.uid}
                  title={p.title[0].text}
                  subtitle={p.subtitle[0].text}
                  published_at={new Date(p._meta.firstPublicationDate)}
                />
              ))}
            </aside>
          </section>
        </Grid>
      </Container>
    )
  },
)

export async function getStaticProps({ params }) {
  const post = await PrismicService.getBlogPost(params.slug)
  const latestPosts = await PrismicService.getLatestBlogPosts(post._meta.id)
  const nextPost = await PrismicService.getNextBlogPost(post._meta.id)
  const prevPost = await PrismicService.getPreviousBlogPost(post._meta.id)

  console.log('post', post.categories)

  return {
    props: {
      post,
      latestPosts,
      nextPost,
      prevPost,
    },
  }
}

export async function getStaticPaths() {
  const posts = await PrismicService.getBlogPosts(null, null)
  return {
    paths: posts.map((post) => ({ params: { slug: post._meta.uid } })),
    fallback: false,
  }
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 33%;
  }
`

export default BlogPost
