import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

import { formatDate } from 'utils/date-format'

type Options = {
  uid: string
  title: string
  subtitle: string
  published_at: Date
  categories?: any[]
}

function Post(opts: Options) {
  return (
    <Article className="mb-4 group relative p-4 transition-shadow transition-color duration-200 rounded hover:shadow-xl hover:bg-white focus-within:bg-white focus-within:shadow-xl">
      <h5 className="font-semibold text-lg">
        <LinkWrapper href={`/blog/${opts.uid}`} passHref>
          <Anchor
            className="underline group-hover:text-decoration-style-dotted focus:text-decoration-style-dotted"
            style={{ textDecorationThickness: 2 }}
          >
            {opts.title}
          </Anchor>
        </LinkWrapper>
      </h5>
      <p className="text-gray-600 text-sm">{opts.subtitle}</p>
      <small className="block uppercase text-gray-500">{formatDate(opts.published_at)}</small>
      {opts.categories != null && (
        <div className="flex items-center justify-start flex-wrap gap-1">
          {opts.categories.map((item) => (
            <Link href={`/blog?tag=${item.category._meta.uid}`}>
              <a className="text-xs rounded px-2 py-1 bg-white group-hover:bg-gray-50 text-gray-500">{item.category.name}</a>
            </Link>
          ))}
        </div>
      )}
    </Article>
  )
}

export default Post

const LinkWrapper = styled(Link)`
  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`

const Anchor = styled.a`
  &::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`

const Article = styled.article`
  &:last-child {
    margin-bottom: 0;
  }
`
