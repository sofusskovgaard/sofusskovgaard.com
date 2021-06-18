import React from 'react'
import styled from 'styled-components'
import { Star, GitBranch, GitCommit } from 'react-feather'

// import { formatDate } from 'utils/date-format'

import RepositoryModel from 'models/repository'

type Options = {
  data: RepositoryModel
}

const Repository = (opts: Options) => (
  <Article className="group relative p-4 transition-shadow transition-color duration-200 rounded hover:shadow-xl hover:bg-white focus-within:bg-white focus-within:shadow-xl">
    <h5 className="font-semibold text-lg">
      <A
        href="#"
        className="underline group-hover:text-decoration-style-dotted focus:text-decoration-style-dotted"
        style={{ textDecorationThickness: 2 }}
      >
        {opts.data.name}
      </A>
    </h5>
    <span className="text-gray-600">{opts.data.description}</span>
    {/* <div className="flex justify-end">
      <span className="transition-shadow flex p-1 rounded shadow-lg group-hover:shadow-none bg-white items-center uppercase text-gray-500 mr-1">{opts.data.} <GitCommit className="ml-1" size={16} /></span>
      <span className="transition-shadow flex p-1 rounded shadow-lg group-hover:shadow-none bg-white items-center uppercase text-gray-500 mr-1">{opts.data.branches} <GitBranch className="ml-1" size={16} /></span>
      <span className="transition-shadow flex p-1 rounded shadow-lg group-hover:shadow-none bg-white items-center uppercase text-gray-500">{opts.data.stars} <Star className="ml-1" size={16} /></span>
    </div> */}
  </Article>
)

export default Repository

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
