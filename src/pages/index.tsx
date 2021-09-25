import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import Head from 'next/head'
import dynamic from 'next/dynamic'

// data access
import PrismicService from 'services/prismic-service'

// utils
import { useStores } from 'utils/stores'
import ApiSearchResponse from '@prismicio/client/types/ApiSearchResponse'
import { Document } from '@prismicio/client/types/documents'
import { GetStaticPropsResult } from 'next'

// components
const Post = dynamic(() => import('components/post'))
const List = dynamic(() => import('components/list'))
const Container = dynamic(() => import('components/container'))
const Introduction = dynamic(() => import('components/introduction'))

const WorkExperience = dynamic(() => import('components/work-experience'))
const Education = dynamic(() => import('components/education'))

const Home = observer(({ posts, components }: Props) => {
  const stores = useStores()

  return (
    <Container>
      <Head>
        <title>Welcome &mdash; {stores.uiStore.app_name}</title>
        <meta name="keywords" content="sofus,skovgaard,software,developer,designer,react,csharp,dotnet,javascript,js,typescript,ts" />
        <meta name="description" content="My name is Sofus Skovgaard and i'm Software Developer and Designer. This is my website where you can find my portfolio, blog and ways to contact me." />
      </Head>

      <Introduction model={components.introduction} />

      <div className="flex flex-col md:flex-row gap-4 md:gap-10">
        <div className="flex flex-col flex-1 gap-4 md:gap-10">
          {components.workExperience != null && (
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
            />
          )}

          {components.education != null && (
            <List
              title="Education"
              render={(edu: Document) => (
                <Education
                  key={edu.id}
                  subject={edu.data.subject}
                  school={edu.data.shool}
                  started={edu.data.started}
                  stopped={edu.data.stopped}
                />
              )}
              model={components.education.results}
            />
          )}
        </div>

        <div className="flex flex-col flex-1 gap-4 md:gap-10">
          {posts != null && (
            <List
              title="Latest posts"
              link={{ href: '/blog', text: 'All posts' }}
              render={(post: Document) => (
                <Post
                  key={post.id}
                  doc={post}
                  hideThumbnail
                />
              )}
              model={posts.results}
              emptyText="There are no posts"
            />
          )}
        </div>
      </div>
    </Container>
  )
})

type Props = {
  posts: ApiSearchResponse
  components: {
    workExperience: ApiSearchResponse
    education: ApiSearchResponse
    introduction: Document
  }
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const posts = await PrismicService.getBlogPosts(1, 5) as ApiSearchResponse

  const workExperience = await PrismicService.getWorkExperience()
  const education = await PrismicService.getEducation()
  const introduction = await PrismicService.getIntroduction()

  return {
    props: {
      posts,
      components: {
        introduction,
        workExperience,
        education,
      },
    },
    revalidate: 60,
  }
}

export default Home
