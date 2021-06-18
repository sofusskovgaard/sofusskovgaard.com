import React from 'react'
import styled from 'styled-components'

import { formatDate } from 'utils/date-format'

import PostModel from 'models/post'

type Options = {
  post: PostModel
}

function Post(opts: Options) {
  return (
    <Article className="group relative p-4 transition-shadow transition-color duration-200 rounded hover:shadow-xl hover:bg-white focus-within:bg-white focus-within:shadow-xl mb-4">
      <h5 className="font-semibold text-lg">
        <A
          href="#"
          className="underline group-hover:text-decoration-style-dotted focus:text-decoration-style-dotted"
          style={{ textDecorationThickness: 2 }}
        >
          {opts.post.title}
        </A>
      </h5>
      <span className="text-gray-600">{opts.post.subtitle}</span>
      <small className="block uppercase text-gray-500">{formatDate(opts.post.releaseTs)}</small>
    </Article>
  )
}

export default Post

const A = styled.a`
  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`

const Article = styled.article`
  &:last-child {
    margin-bottom: 0;
  }
`
