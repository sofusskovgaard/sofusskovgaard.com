import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { observer } from "mobx-react";
import dynamic from "next/dynamic";
import cx from "classnames";

const Container = dynamic(() => import("components/container"));

const Navbar = observer(() => {
  const router = useRouter();
  return (
    <Container>
      <ul className="flex gap-2 py-2 my-10 justify-center">
        <li>
          <Link
            href="/"
            className={cx(
              "px-4 py-2 hover:bg-white hover:shadow-xl rounded transition-shadow transition-color duration-200",
              router.pathname == "/" && "bg-white shadow-xl"
            )}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/blog"
            className={cx(
              "px-4 py-2 hover:bg-white hover:shadow-xl rounded transition-shadow transition-color duration-200",
              router.pathname == "/blog" && "bg-white shadow-xl"
            )}
          >
            Blog
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className={cx(
              "px-4 py-2 hover:bg-white hover:shadow-xl rounded transition-shadow transition-color duration-200",
              router.pathname == "/contact" && "bg-white shadow-xl"
            )}
          >
            Contact
          </Link>
        </li>
      </ul>
    </Container>
  );
});

export default Navbar;
