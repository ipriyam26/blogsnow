'use client';
import React from 'react';
import Link from 'next/link';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation';
import { Inter } from '@next/font/google';

const menus = [
    {
        name: 'View all',
        link: '/home/all'
    }, {
        name: 'Design',
        link: '/home/design'
    }, 
    {
        name: 'Product',
        link: '/home/product'
    },
    {
        name: 'Software Development',
        link: '/home/development'
    },
    
     
    {
        name: 'Customer Success',
        link: '/home/support'
    }
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const inter = Inter({ subsets: ['latin'] })

export function Localnav() {
    const pathname = usePathname();
    console.log(pathname);
    return (

        <div className='pt-16 pb-8'>
            <Disclosure as="nav" className="">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl ">
                            <div className="relative flex h-16 items-center justify-between">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    {/* Mobile menu button*/}
                                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                   
                                    <div className={` ${inter.className}  hidden  sm:block`}>
                                        <div className="flex space-x-4">
                                            {menus.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.link}
                                                    className={classNames(
                                                        item.link === pathname ? 'bg-gray-100 ' : ' text-gray-500 hover:bg-gray-700 hover:text-white',
                                                        'px-3 py-2 rounded-md text-md font-medium'
                                                    )}
                                                    aria-current={item.link === pathname ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                          
                            </div>
                        </div>


                    </>
                )}
            </Disclosure>


        </div>);
}
