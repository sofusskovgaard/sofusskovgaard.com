import React from 'react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'

import { StoreProvider } from 'utils/stores'

const Navbar = dynamic(() => import('components/navbar'))
const Footer = dynamic(() => import('components/footer'))

import '@fortawesome/fontawesome-free/scss/fontawesome.scss'
import '@fortawesome/fontawesome-free/scss/regular.scss'
import '@fortawesome/fontawesome-free/scss/solid.scss'
import '@fortawesome/fontawesome-free/scss/brands.scss'

import 'styles/core.scss'

function MyApp({ Component, pageProps }: { Component: NextPage; pageProps: any }) {
  return (
    <StoreProvider hydrationData={pageProps.hydrationData}>
      <header>
        <Navbar />
      </header>
      <main className="flex-1 flex flex-col">
        <Component {...pageProps} />
      </main>
      <Footer />
    </StoreProvider>
  )
}

export default MyApp
