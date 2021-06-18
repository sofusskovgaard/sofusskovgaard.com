import React, { useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { NextPage } from 'next'

/**
 * Components
 */
import Post from 'components/post'
import Repository from 'components/repository'
import List from 'components/list'
import Container from 'components/container'
import Loader from 'components/loader'

const Home: NextPage = () => {
  return (
    <Container className="grid gap-4 grid-cols-1 md:grid-cols-2 pt-4 md:pt-12 pb-4">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 grid-rows-3 md:grid-rows-6 md:col-span-2">
        <div className="col-start-1 row-start-2 md:row-start-1 md:row-span-6">
          <Image
            src="/images/sofus_skovgaard.jpg"
            className="rounded"
            alt="Picture of Sofus Skovgaard"
            height={400}
            width={400}
            layout="responsive"
          />
        </div>

        <section className="row-start-1 col-start-1 md:col-start-2">
          <h1 className="font-bold text-3xl mb-1">Sofus Skovgaard</h1>
          <h3 className="font-medium uppercase text-gray-500">Developer / Designer / Photographer</h3>
        </section>

        <section className="row-start-3 md:col-start-2 md:row-span-5">
          <p className="mb-4">
            Culpa nostrud sit et ex aute ea. Deserunt deserunt ad cillum deserunt veniam duis ipsum eu elit sit. Id ea
            qui velit nostrud ullamco.
          </p>
          <p>
            Quis non est reprehenderit fugiat tempor aliqua. Lorem deserunt enim enim aliqua laborum dolore ullamco
            voluptate culpa adipisicing aliqua laboris Lorem. Ad qui est ea nostrud irure duis adipisicing et minim
            Lorem eiusmod ipsum consectetur.
          </p>
        </section>
      </div>

      {/* <List<PostModel>
        className="col-start-1 md:col-start-2 md:row-start-2"
        title="Latest posts"
        link={{ href: '#', text: 'All posts' }}
        render={(model) => <Post key={model.id} post={model} />}
        model={posts}
      /> */}

      {/* <List<RepositoryModel>
          className="md:col-start-1 md:row-start-2"
          title="Repositories"
          link={{ href: '#', text: 'All repositories' }}
          render={(model) => <Repository key={model.id} data={model} />}
          model={}
        /> */}
    </Container>
  )
}

export default Home
