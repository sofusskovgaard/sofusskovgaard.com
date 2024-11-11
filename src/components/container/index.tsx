import React, { PropsWithChildren } from "react";
import cx from "classnames";

const Container = ({
  children,
  className = null,
}: PropsWithChildren<Props>): JSX.Element => {
  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <div className={cx("mx-auto max-w-5xl", className && className)}>
        {children}
      </div>
    </div>
  );
};

export type Props = {
  className?: string | null;
};

export default Container;
