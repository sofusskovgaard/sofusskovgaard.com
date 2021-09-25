import React, { useEffect } from 'react'
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
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: { Component: NextPage; pageProps: any }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      ;(window as any).gtag('config', process.env.GOOGLE_ANALYTICS_KEY, {
        page_path: url,
      })
      console.log('logged', url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

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
