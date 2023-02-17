"use client"

import { Disclosure, } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Inter } from '@next/font/google'
import Image from 'next/image'
const navigation = [
  { name: 'Home', href: '#', current: true },
  { name: 'Products', href: '#', current: false },
  { name: 'Resources', href: '#', current: false },
  { name: 'Pricing', href: '#', current: false },
]

const inter = Inter({ subsets: ['latin'] })
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  return (
    <Disclosure as="nav" className="">
      {({ open }) => (
        <>
          <div className=" md:mx-10 mx-5 max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex   h-16 items-center justify-between">
              <div className="absolute inset-y-0 right-0 flex items-center justify-end   sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center   justify-end rounded-md p-2 text-gray-900 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block justify-end h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block  justify-end h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex  flex-1 items-center justify-start sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">


                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                  </svg>
                </div>
                <a href="\all">
                  <h3 className={`font-medium ${inter.className} mx-8  text-gray-900 lg:block lg:pr-8  text-2xl `}>
                    Untitled UI
                  </h3>
                </a>

                <div className="hidden sm:ml-6 sm:block">
                  <div className={`flex space-x-6 ${inter.className}`}>


                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-800 hover:bg-gray-700 hover:text-white',
                          `px-5 py-2 rounded-md text-md  `
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

          <Disclosure.Panel className={`sm:hidden ${inter.className}`}>
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'hover:bg-gray-700 hover:text-white text-black',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
