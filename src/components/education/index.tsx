import React, { useState } from 'react'
import styled from 'styled-components'

import { formatDateWithoutDay } from 'utils/date-format'

import { addYears, differenceInMonths, differenceInYears, subYears } from 'date-fns'

type Options = {
  subject: string
  school: string
  started: string
  stopped?: string
}

function Education(opts: Options) {
  const [startedDate] = useState(Date.parse(opts.started))
  const [stoppedDate] = useState(Date.parse(opts.stopped))

  const [years] = useState(differenceInYears(opts.stopped != null ? stoppedDate : Date.now(), startedDate))
  const [months] = useState(
    differenceInMonths(opts.stopped != null ? stoppedDate : Date.now(), addYears(startedDate, years)),
  )
  
  return (
    <article className="p-4">
      <h5 className="font-semibold text-lg">{opts.subject}</h5>
      <span className="text-sm font-medium underline">
        {opts.school}
      </span>
      <small className="block text-gray-600">
        {formatDateWithoutDay(opts.started)} &ndash;{' '}
        {opts.stopped != null ? formatDateWithoutDay(opts.stopped) : 'Present'}
        <span className="mx-1">&middot;</span>
        {years} yrs {months} mos
      </small>
    </article>
  )
}

export default Education
