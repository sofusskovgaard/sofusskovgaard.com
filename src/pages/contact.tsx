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

const Contact = observer(({ posts }: { posts: Document[] }) => {
  const stores = useStores()
  return (
    <Container>
      <Head>
        <title>Contact &mdash; {stores.uiStore.app_name}</title>
      </Head>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
        <section>
          <h1 className="font-bold text-4xl mb-4">Get in touch</h1>
          <p>
            Got an interesting project, some feedback or maybe even an idea? Don't hesitate to hit me up. I'm looking forward to hearing from you.
          </p>
          <ul className="mt-4">
            <li><a className="font-medium underline active:text-decoration-style-dotted hover:text-decoration-style-dotted focus:text-decoration-style-dotted" href="mailto:hello@sofusskovgaard.com">hello@sofusskovgaard.com</a></li>
          </ul>
        </section>
        <section className="grid grid-cols-2 gap-4">
          <div className="col-span-2 md:col-span-1">
            <label className="block font-medium mb-1">Name</label>
            <input type="text" name="name" className="focus:outline-none focus:ring focus:ring-gray-100 p-4 w-full rounded text-sm" placeholder="John Doe" />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block font-medium mb-1">Email</label>
            <input type="email" name="email" className="focus:outline-none focus:ring focus:ring-gray-100 p-4 w-full rounded text-sm" placeholder="john.doe@mail.com" />
          </div>
          <div className="col-span-2">
            <label className="block font-medium mb-1">Subject</label>
            <input type="text" name="subject" className="focus:outline-none focus:ring focus:ring-gray-100 p-4 w-full rounded text-sm" placeholder="Message of the utmost importance" />
          </div>
          <div className="col-span-2">
            <label className="block font-medium mb-1">Message</label>
            <textarea name="message" className="focus:outline-none focus:ring focus:ring-gray-100 p-4 w-full rounded text-sm" rows={9} placeholder="Hello there." />
          </div>
          <button className="col-span-2 px-4 py-2 font-medium rounded bg-gray-100 hover:bg-black focus:bg-black text-black hover:text-white focus:text-white hover:shadow-xl transition-color duration-200">Send message</button>
        </section>
      </div>
    </Container>
  )
})

export async function getStaticProps() {
  const posts = await PrismicService.getBlogPosts(null, null)
  return {
    props: {
      posts,
    },
  }
}

export default Contact
