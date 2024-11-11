import React, { useState } from "react";

import { formatDateWithoutDay } from "utils/date-format";

import { addYears, differenceInMonths, differenceInYears } from "date-fns";

export type Props = {
  job_title: string;
  company: string;
  company_url: string;
  started: string;
  stopped?: string;
};

function WorkExperience(opts: Props): JSX.Element {
  const [startedDate] = useState(Date.parse(opts.started));
  const [stoppedDate] = useState(
    opts.stopped ? Date.parse(opts.stopped) : null
  );

  const [years] = useState(
    differenceInYears(stoppedDate ?? Date.now(), startedDate)
  );
  const [months] = useState(
    differenceInMonths(stoppedDate ?? Date.now(), addYears(startedDate, years))
  );

  return (
    <article>
      <h5 className="font-semibold text-lg">{opts.job_title}</h5>
      <a
        href={opts.company_url}
        className="text-sm font-medium underline"
        target="_blank"
      >
        {opts.company}
      </a>
      <small className="block text-gray-600">
        {formatDateWithoutDay(opts.started)} &ndash;{" "}
        {opts.stopped != null ? formatDateWithoutDay(opts.stopped) : "Present"}
        <span className="mx-1">&middot;</span>
        {years > 0 && <span>{years} yrs</span>}
        {months > 0 && <span> {months} mos</span>}
      </small>
    </article>
  );
}

export default WorkExperience;
