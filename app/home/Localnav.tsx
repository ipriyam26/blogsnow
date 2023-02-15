'use client';
import React from 'react';
import Link from 'next/link';
import { Fragment } from 'react'
import { Listbox } from '@headlessui/react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { redirect, usePathname } from 'next/navigation';
import { Inter } from '@next/font/google';
import { useState } from 'react'

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
    // selected person is the one which has its name in the pathname
    const selectedPerson = menus.find((person) => person.link === pathname)
    return (

        <div className='pt-16 pb-8'>
            <div className="mx-auto max-w-7xl ">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
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
            <div className='border rounded border-gray-300 sm:hidden'>

                <Listbox

                    value={selectedPerson?.name}
                    onChange={
                        (value) => {
                            // redirect to the link of the selected person
                            const newSelectedPerson = menus.find((person) => person.name === value)
                            redirect(newSelectedPerson!.link);
                        }

                    }
                >
                    <Listbox.Button className={`p-2.5`}>
                        {selectedPerson!.name}

                    </Listbox.Button>
                    <Listbox.Options>
                        {
                            // map over menu but only render the ones which are not selected
                            menus.filter((person) => person.name !== selectedPerson?.name).map(
                                (person) => (

                                    <Listbox.Option
                                        className={` p-2.5  border-gray-300 `}
                                        key={person.name}
                                        value={person}
                                    >
                                        {person.name}
                                    </Listbox.Option>
                                )
                            )
                        }

                    </Listbox.Options>
                </Listbox>
            </div>


        </div>);
}



