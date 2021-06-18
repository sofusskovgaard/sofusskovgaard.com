import React from 'react'
import Head from 'next/head'

import 'styles/core.scss'

function MyApp({ Component, pageProps, initialData }) {
  return (
    <React.Fragment>
      <Head>
        <title>Sofus Skovgaard</title>
      </Head>
      {/* <Navbar /> */}
      <Component {...pageProps} />
    </React.Fragment>
  )
}

export default MyApp
