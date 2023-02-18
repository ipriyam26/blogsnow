'use client';
import React from 'react';
import { Listbox } from '@headlessui/react'
import { redirect, usePathname } from 'next/navigation';
import { Inter } from '@next/font/google';

interface Category {
    id: number;
    attributes: {
        slug: string;
        title: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    }
}




function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const inter = Inter({ subsets: ['latin'] })

function Localnav(
    params: {
        menus: Category[];
    }
) {
    const { menus } = params;
    let pathname = usePathname();
    console.log(pathname);
    pathname = pathname!.replace('/', '');
    // let menus = await getCategories();
    // selected person is the one which has its name in the pathname
    let selectedPerson = menus.find((category) => category.attributes.slug === pathname)
    if (selectedPerson == null) {
        selectedPerson = menus[0];
    }
    return (

        <div className='pt-16 px-4 pb-8'>
            <div className="mx-auto max-w-7xl ">
                <div className="relative flex h-16 items-center justify-between">
                    
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">

                        <div className={` ${inter.className}  hidden  sm:block`}>
                            <div className="flex space-x-4">
                                {menus.map((category) => (
                                    <a
                                        key={category.attributes.title}
                                        href={`http://localhost:3000/${category.attributes.slug}`}
                                        className={classNames(
                                            category.attributes.slug === pathname ? 'bg-gray-100 ' : ' text-gray-500 hover:bg-gray-700 hover:text-white',
                                            'px-3 py-2 rounded-md text-md font-medium'
                                        )}
                                        aria-current={category.attributes.slug === pathname ? 'page' : undefined}
                                    >
                                        {category.attributes.title}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className='border rounded  border-gray-300 sm:hidden'>

                <Listbox

                    value={selectedPerson?.attributes.title}
                    onChange={
                        (value) => {


                            let newSelectedPerson = menus.find((category) => category.attributes.title === value);
                          redirect(`http://localhost:3000/${newSelectedPerson?.attributes.slug}`)
                        }

                    }
                >
                    <Listbox.Button className={`p-2.5`}>
                        {selectedPerson!.attributes.title}

                    </Listbox.Button>
                    <Listbox.Options>
                        {
                            // map over menu but only render the ones which are not selected
                            menus.filter((person) => person.attributes.title !== selectedPerson?.attributes.title).map(
                                (person) => (

                                    <Listbox.Option
                                        className={` p-2.5  border-gray-300 `}
                                        key={person.attributes.title}
                                        value={person.attributes.title}

                                    >
                                        {person.attributes.title}
                                    </Listbox.Option>
                                )
                            )
                        }

                    </Listbox.Options>
                </Listbox>
            </div>


        </div>);
}



export default Localnav;