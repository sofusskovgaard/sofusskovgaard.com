import React from 'react'
import cx from 'classnames'

const Container = ({ children, className = null }) => {
  return (
    <div className={cx('container mx-auto px-4 md:px-0 lg:w-8/12 2xl:w-6/12 flex flex-col gap-10', className && className)}>{children}</div>
  )
}

export default Container
