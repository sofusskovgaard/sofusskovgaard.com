import React from 'react'
import Link from 'next/link'
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
      <h4 className="font-mono inline uppercase text-gray-500">{opts.title}</h4>
      <span
        className={cx('flex-1 my-auto inline-block w-100 border-b border-gray-200', opts.link ? 'mx-4' : 'ml-4')}
      ></span>
      {opts.link && (
        <Link href={opts.link.href}>
          <a className="uppercase text-xs text-gray-500 hover:text-black focus:text-black font-mono">
            {opts.link.text}
          </a>
        </Link>
      )}
    </div>

    {opts.model.map((item) => opts.render(item))}
  </section>
)

export default List
