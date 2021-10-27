import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

const Custom500 = (): JSX.Element => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center h-full">
      <Head>
        <meta name="robots" content="noindex" />
        <title>500 &mdash; Server error</title>
      </Head>
      <h1 className="font-bold text-6xl underline mb-10">500</h1>
      <p className="text-xl text-center">
        There&apos;s ben a terrible accident on the server, please bear with me.
        <br />
        If this keeps happening please{' '}
        <Link href="/contact">
          <a className="font-medium underline active:text-decoration-style-dotted hover:text-decoration-style-dotted focus:text-decoration-style-dotted">
            contact me
          </a>
        </Link>{' '}
        or shoot me an email{' '}
        <a
          className="font-medium underline active:text-decoration-style-dotted hover:text-decoration-style-dotted focus:text-decoration-style-dotted"
          href="mailto:hello@sofusskovgaard.com"
        >
          hello@sofusskovgaard.com
        </a>
        .
      </p>
      <Link href="/">
        <a className="font-medium p-2 mt-4 underline active:text-decoration-style-dotted hover:text-decoration-style-dotted focus:text-decoration-style-dotted">
          Let me get you out of here.
        </a>
      </Link>
    </div>
  )
}

export default Custom500
