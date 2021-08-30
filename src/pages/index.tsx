import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import Head from 'next/head'
import dynamic from 'next/dynamic'

// data access
import PrismicService from 'services/prismic-service'
import { Document } from '@prismicio/client/types/documents'

// utils
import { useStores } from 'utils/stores'
import ComponentTypes from 'enums/ComponentTypes'
import ApiSearchResponse from '@prismicio/client/types/ApiSearchResponse'
import WorkExperience from 'components/work-experience'

// components
const Post = dynamic(() => import('components/post'))
const List = dynamic(() => import('components/list'))
const Container = dynamic(() => import('components/container'))
const Introduction = dynamic(() => import('components/introduction'))

const Home = observer(
  ({
    posts,
    components,
  }: {
    posts: any[]
    components: { introduction: any; workExperience: any }
  }) => {
    const stores = useStores()

    return (
      <Container>
        <Head>
          <title>{stores.uiStore.app_name}</title>
        </Head>

        <Introduction model={components.introduction} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {components.workExperience != null && (
            <List
              title="Work experience"
              render={(exp: any) => (
                <WorkExperience
                  key={exp._meta.id}
                  job_title={exp.job_title}
                  company={exp.company}
                  company_url={exp.company_url.url}
                  started={exp.started}
                  stopped={exp.stopped}
                />
              )}
              model={components.workExperience}
              className="col-start-1 row-start-1"
            />
          )}
          {/* {components.workExperience != null && (
            <List
              title="Work experience"
              render={(exp: Document) => (
                <WorkExperience
                  key={exp.id}
                  job_title={exp.data.job_title}
                  company={exp.data.company}
                  company_url={exp.data.company_url.url}
                  started={exp.data.started}
                  stopped={exp.data.stopped}
                />
              )}
              model={components.workExperience.results}
              className="col-start-1"
            />
          )} */}

          {posts != null && (
            <List
              title="Latest posts"
              link={{ href: '/blog', text: 'All posts' }}
              render={(post: any) => (
                <Post
                  key={post._meta.id}
                  uid={post._meta.uid}
                  title={post.title[0].text}
                  subtitle={post.subtitle[0].text}
                  published_at={new Date(post._meta.firstPublicationDate)}
                  categories={post.categories}
                />
              )}
              model={posts}
              className="col-start-1 md:col-start-2 row-start-2 md:row-start-1 row-span-2"
            />
          )}
        </div>
      </Container>
    )
  },
)

export async function getStaticProps() {
  const posts = await PrismicService.getBlogPosts(1, 5)
  const workExperience = await PrismicService.getWorkExperience()
  const introduction = await PrismicService.getIntroduction()
  return {
    props: {
      posts,
      components: {
        introduction,
        workExperience,
      },
    },
  }
}

export default Home
