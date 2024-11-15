import React, { PropsWithChildren } from "react";
import Link from "next/link";
import cx from "classnames";

export type ListType<Model> = {
  title: string;
  link?: {
    href: string;
    text: string;
  };
  render: (model: Model) => React.ReactNode;
  model: Model[];
  className?: string;
  emptyText?: string;
};

const List = <Model extends unknown>(
  opts: PropsWithChildren<ListType<Model>>
): JSX.Element => (
  <section className={cx(opts.className && opts.className)}>
    <div className="flex items-center justify-center mb-4">
      <h4 className="font-medium inline">{opts.title}</h4>
      <span
        className={cx(
          "flex-1 my-auto inline-block w-100 border-b border-gray-200",
          opts.link ? "mx-4" : "ml-4"
        )}
      ></span>
      {opts.link && (
        <Link
          className="font-medium text-xs text-gray-500 hover:text-black focus:text-black"
          href={opts.link.href}
        >
          {opts.link.text}
        </Link>
      )}
    </div>

    <div className="flex flex-col gap-4">
      {opts.model.length > 0 ? (
        opts.model.map((item) => opts.render(item))
      ) : (
        <span className="text-center text-sm text-gray-400">
          {opts.emptyText ?? "There is no content to display"}
        </span>
      )}
    </div>
  </section>
);

export default List;
