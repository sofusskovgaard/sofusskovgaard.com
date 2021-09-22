import React from 'react'
import { RichText } from 'prismic-reactjs'
import { Document } from '@prismicio/client/types/documents'

const Introduction = ({ model }: { model: Document }) => {
  return (
    <div className="grid gap-y-4 md:gap-y-0 gap-x-4 md:gap-x-10 grid-cols-1 md:grid-cols-2" style={{ gridTemplateRows: 'max-content' }}>
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
    </div>
  )
}

export default Introduction
