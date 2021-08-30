import React from 'react'
import { RichText } from 'prismic-reactjs'

const Introduction = ({ model }: { model: any }) => {
  return (
    <div className="grid gap-4 md:gap-10 grid-cols-1 md:grid-cols-2 mb-8 md:mb-10" style={{ gridTemplateRows: 'max-content' }}>
      <div className="md:row-span-2">
        <img
          alt={model[0].portrait.alt}
          src={model[0].portrait.url}
          height={model[0].portrait.dimensions.height}
          width={model[0].portrait.dimensions.width}
          className="rounded w-full"
        />
      </div>

      <section className="row-start-1 col-start-1 md:col-start-2">
        <h1 className="font-bold text-3xl">{model[0].title[0].text}</h1>
        <h3 className="font-mono font-medium uppercase text-gray-500">{model[0].subtitle[0].text}</h3>
      </section>

      <section className="prose w-full row-start-3 md:row-start-2 md:col-start-2">
        {RichText.render(model[0].introduction)}
      </section>
    </div>
  )
}

export default Introduction
