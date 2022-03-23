import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const Custom404 = (): JSX.Element => {
  const router = useRouter()
  return (
    <div className="flex-1 flex flex-col items-center justify-center h-full">
      <Head>
        <meta name="robots" content="noindex" />
        <title>
          404 &mdash;{' '}
          {router.asPath.includes('blog')
            ? "It seems this post doesn't exist anymore or never did, we'll never know."
            : 'Nothing to see here.'}
        </title>
      </Head>
      <h1 className="font-bold text-6xl underline mb-10">404</h1>
      <p className="text-xl">
        {router.asPath.includes('blog')
          ? "It seems this post doesn't exist anymore or never did, we'll never know."
          : 'Nothing to see here.'}
      </p>
      <Link href={router.asPath.includes('blog') ? '/blog' : '/'}>
        <a className="font-medium p-2 mt-4 underline active:text-decoration-style-dotted hover:text-decoration-style-dotted focus:text-decoration-style-dotted">
          Let me get you out of here.
        </a>
      </Link>
    </div>
  )
}

export default Custom404
