import React from 'react'
import { RichText } from 'prismic-reactjs'
import { Document } from '@prismicio/client/types/documents'
import styled from 'styled-components'

const Introduction = ({ model }: { model: Document }) => {
  return (
    <Grid className="gap-10">
      <img
          alt={model.data.portrait.alt}
          src={model.data.portrait.url}
          height={model.data.portrait.dimensions.height}
          width={model.data.portrait.dimensions.width}
          className="md:row-span-2 rounded w-full"
        />

      <section className="row-start-1 col-start-1 md:col-start-2">
        <h1 className="font-bold text-3xl">{model.data.title[0].text}</h1>
        <h3 className="font-mono font-medium uppercase text-gray-500">{model.data.subtitle[0].text}</h3>
      </section>

      <section className="prose w-full row-start-3 md:row-start-2 md:col-start-2">
        {RichText.render(model.data.introduction)}
      </section>
    </Grid>
  )
}

export default Introduction

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    gap: 1rem;
  }
`
