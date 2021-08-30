import React from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const Container = dynamic(() => import('components/container'))

const Footer = () => {
  return (
    <footer>
      <Container className="mt-10 mb-6">
        <div className="flex items-center justify-between">
          <nav>
            <ul className="flex gap-2 text-gray-600 text-sm">
              <li>
                <Link href="/"><a className="px-2 py-1">Home</a></Link>
              </li>
              <li><Link href="/blog"><a className="px-2 py-1">Blog</a></Link></li>
              <li><Link href="/contact"><a className="px-2 py-1">Contact</a></Link></li>
            </ul>
          </nav>

          <ul className="flex text-gray-600 gap-2 text-sm">
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
              <a href="https://untappd.com/user/sofus_skovgaard" target="_blank" rel="noopener" className="hover:text-black">
                <i className="fab fa-untappd fa-fw fa-lg"></i>
                {/* <Twitter size={20} /> */}
                <span className="sr-only">Untapped</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="flex items-center mt-3 text-xs text-gray-600">
          <span>&copy; {new Date().getFullYear()} Sofus Skovgaard</span>
          <span className="mx-2">|</span>
          <Link href="/sitemap">
            <a className="p-1">sitemap</a>
          </Link>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
