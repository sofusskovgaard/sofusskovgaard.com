import React from 'react'
import cx from 'classnames'

export type ListType<Model> = {
  title: string
  link?: {
    href: string
    text: string
  }
  render: (model: Model) => JSX.Element
  model: Model[]
  className?: string
}

const List = <Model extends unknown>(opts: ListType<Model>) => (
  <section className={cx(opts.className && opts.className)}>
    <div className="flex items-center justify-center mb-4">
      <h4 className="inline uppercase text-gray-500">{opts.title}</h4>
      <span
        className={cx('flex-1 my-auto inline-block w-100 border-b border-gray-200', opts.link ? 'mx-4' : 'ml-4')}
      ></span>
      {opts.link && (
        <a href={opts.link.href} className="uppercase text-xs text-gray-500 hover:text-black focus:text-black">
          {opts.link.text}
        </a>
      )}
    </div>

    {opts.model.map((item) => opts.render(item))}
  </section>
)

export default List
