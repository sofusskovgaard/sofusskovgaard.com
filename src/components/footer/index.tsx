import React from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const Container = dynamic(() => import('components/container'))

const Footer = () => {
  return (
    <footer>
      <Container className="mt-10 mb-6">
        <div className="flex flex-wrap gap-x-3 gap-y-4 items-center text-xs text-gray-600">
          <div className="my-auto ml-auto md:ml-0">
            <span className="my-auto">&copy; {new Date().getFullYear()} Sofus Skovgaard</span>
          </div>
          <div className="my-auto mr-auto md:mr-0">
            <span className="mr-2">/</span>
            <Link href="/sitemap">
              <a className="p-1">sitemap</a>
            </Link>
          </div>
          <ul className="flex items-center justify-center md:justify-start text-gray-600 gap-2 text-sm w-full md:w-auto ml-auto order-first md:order-none">
            <li>
              <a
                href="https://www.linkedin.com/in/sofusskovgaard/"
                target="_blank"
                rel="noopener"
                className="hover:text-black"
              >
                <i className="fab fa-linkedin fa-fw fa-lg"></i>
                {/* <Linkedin size={20} /> */}
                <span className="sr-only">Linkedin</span>
              </a>
            </li>
            <li>
              <a href="https://github.com/sofusskovgaard" target="_blank" rel="noopener" className="hover:text-black">
                <i className="fab fa-github fa-fw fa-lg"></i>
                {/* <GitHub size={20} /> */}
                <span className="sr-only">Github</span>
              </a>
            </li>
            <li>
              <a href="https://gitlab.com/sofusskovgaard" target="_blank" rel="noopener" className="hover:text-black">
                <i className="fab fa-gitlab fa-fw fa-lg"></i>
                {/* <GitHub size={20} /> */}
                <span className="sr-only">Gitlab</span>
              </a>
            </li>
            <li>
              <a href="https://twitter.com/sofusskovgaard" target="_blank" rel="noopener" className="hover:text-black">
                <i className="fab fa-twitter fa-fw fa-lg"></i>
                {/* <Twitter size={20} /> */}
                <span className="sr-only">Twitter</span>
              </a>
            </li>
            <li>
              <a
                href="https://untappd.com/user/sofus_skovgaard"
                target="_blank"
                rel="noopener"
                className="hover:text-black"
              >
                <i className="fab fa-untappd fa-fw fa-lg"></i>
                {/* <Twitter size={20} /> */}
                <span className="sr-only">Untapped</span>
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
