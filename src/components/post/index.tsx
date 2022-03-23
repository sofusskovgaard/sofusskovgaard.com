import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import cx from 'classnames'
import { Document } from '@prismicio/client/types/documents'

import { formatDate } from 'utils/date-format'

function NoImagePost({ doc, ...props }: { doc: Document; className?: string; hideThumbnail?: boolean }) {
  return (
    <article
      className={cx(
        'h-full flex flex-col group relative p-4 transition-shadow transition-color duration-200 rounded hover:shadow-xl focus-within:shadow-xl hover:bg-white focus-within:bg-white',
        props.className,
      )}
    >
      <h5 className="font-semibold text-lg">
        <LinkWrapper href={`/blog/${doc.uid}`} passHref>
          <Anchor
            className="underline group-hover:text-decoration-style-dotted focus:text-decoration-style-dotted"
            style={{ textDecorationThickness: 2 }}
          >
            {doc.data.title[0].text}
          </Anchor>
        </LinkWrapper>
      </h5>
      <p className="text-gray-600 text-sm">{doc.data.subtitle[0].text}</p>
      <small className="block uppercase text-gray-500">{formatDate(doc.first_publication_date)}</small>
    </article>
  )
}

function ImagePost({
  doc,
  ...props
}: {
  doc: Document
  className?: string
  hideThumbnail?: boolean
  isMain?: boolean
}) {
  return (
    <article className={cx('group relative rounded bg-black max-h-full overflow-hidden', props.className)}>
      <img
        className={cx('w-full object-cover transition-opacity duration-200 rounded group-hover:opacity-80 opacity-60')}
        style={{ filter: 'grayscale(66%)' }}
        src={doc.data.thumbnail.url}
        alt={doc.data.thumbnail.alt}
      />
      <div className="flex flex-col p-4 absolute top-0 bottom-0 left-0 right-0 transition-all duration-200 group-hover:backdrop-blur-sm backdrop-blur-0">
        <h5 className="font-semibold text-lg text-white">
          <LinkWrapper href={`/blog/${doc.uid}`} passHref>
            <Anchor
              className="underline group-hover:text-decoration-style-dotted focus:text-decoration-style-dotted"
              style={{ textDecorationThickness: 2 }}
            >
              {doc.data.title[0].text}
            </Anchor>
          </LinkWrapper>
        </h5>
        <p className="text-gray-100 text-sm">{doc.data.subtitle[0].text}</p>
        <small className="block uppercase text-gray-50 mt-auto ml-auto">{formatDate(doc.first_publication_date)}</small>
      </div>
    </article>
  )
}

function Post(props: Props): JSX.Element {
  return !props.hideThumbnail && props.doc.data.thumbnail.url != null ? (
    <ImagePost {...props} />
  ) : (
    <NoImagePost {...props} />
  )
}

export default Post

export type Props = {
  doc: Document
  className?: string
  hideThumbnail?: boolean
  isMain?: boolean
}

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
