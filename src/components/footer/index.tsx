import React from 'react'
import { Linkedin, GitHub, Twitter } from 'react-feather'

import Container from 'components/container'

const Footer = () => {
  return (
    <footer>
      <Container className="py-4">
        <div className="flex justify-between">
          <nav>
            <ul className="flex text-gray-600 text-sm">
              <li>Home</li>
              <li className="ml-4">Blog</li>
              <li className="ml-4">Contact</li>
            </ul>
          </nav>

          <ul className="flex text-gray-600 text-sm">
            <li>
              <a
                href="https://www.linkedin.com/in/sofusskovgaard/"
                target="_blank"
                rel="noopener"
                className="hover:text-black"
              >
                <Linkedin size={20} />
              </a>
            </li>
            <li className="ml-4">
              <a href="https://github.com/sofusskovgaard" target="_blank" rel="noopener" className="hover:text-black">
                <GitHub size={20} />
              </a>
            </li>
            <li className="ml-4">
              <a href="https://twitter.com/sofusskovgaard" target="_blank" rel="noopener" className="hover:text-black">
                <Twitter size={20} />
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-3 text-xs text-gray-600">&copy; {new Date().getFullYear()} Sofus Skovgaard</div>
      </Container>
    </footer>
  )
}

export default Footer
