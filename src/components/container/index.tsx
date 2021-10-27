import React, { PropsWithChildren } from 'react'
import cx from 'classnames'

const Container = ({ children, className = null }: PropsWithChildren<Props>): JSX.Element => {
  return (
    <div
      className={cx('container mx-auto px-4 md:px-0 lg:w-8/12 2xl:w-6/12 flex flex-col gap-10', className && className)}
    >
      {children}
    </div>
  )
}

export type Props = {
  className?: string
}

export default Container
