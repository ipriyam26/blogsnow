

import React, { Children } from 'react'
import { Inter } from '@next/font/google'
import Localnav from './Localnav';
import { EmailBox, Subscribe } from '../Subscribe';
const inter = Inter({ subsets: ['latin'] })


const footer = {
    'Product': [
        'Overview',
        'Features',
        'Solutions',
        'Tutorials',
        'Pricing',
        'Releases'
    ],
    'Company': [
        'About us',
        'Careers',
        'Press',
        'News',
        'Media kit',
        'Contact'],
    'Resources': [
        'Blog',
        'Newsletter',
        'Events',
        'Help Center',
        'Tutorials',
        'Support'
    ],
    'Use Cases': [
        'Startups',
        'Enterprise',
        'Government',
        'SaaS center',
        'Marketplaces',
        'Ecommerce',],
    'Social': [
        'Twitter',
        'Facebook',
        'Instagram',
        'LinkedIn',
        'YouTube',
        'Github',
        'Dribbble',
    ],
    'Legal': [
        'Privacy',
        'Licensing',
        'Terms',
        'Settings',
        'Contact',
        'Cookies'
    ],
}





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

interface Pagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

interface CategoryResponse {
    data: Category[];
    meta: {
        pagination: Pagination;
    }
}



// get all categories from CMS
async function getCategories() {
    let response = await fetch('http://127.0.0.1:1337/api/categories');
    let categories: CategoryResponse = await response.json();
    return categories.data;

}


async function Home({
    children,
}: {
    children: React.ReactNode
}) {
    let menu = await getCategories();

    return (


        <div className={` ${inter.className}   flex flex-col items-center lg:items-stretch`}>
            <div className='py-16 lg:py-20 lg:px-28  px-4 w-screen flex flex-col items-start bg-gray-50 lg:items-stretch'>
                <h2 className='text-purple-500 font-medium mb-6'>Blog</h2>
                <div className="flex  flex-col space-y-5 lg:space-y-0 lg:flex-row lg:items-start justify-between">
                    <h3 className={` text-5xl lg:text-6xl font-semibold`} >Untitled Blog</h3>
                    <p className='lg:w-2/5   lg:mx-0 text-lg text-gray-600 font-normal'>
                        New product features, updates, and the latest tech news, delivered.
                    </p>
                </div>
                <div>
                </div>
                <section className="">
                    <EmailBox disableResponsive={false} textbg={true}></EmailBox>
                </section>
            </div>
            <div className='px-2 sm:px-6 lg:px-8'>
                <Localnav menus={menu}></Localnav>
                {children}
            </div>

            <Subscribe></Subscribe>
            <footer className={`  ${inter.className}`}>

                <div className='grid grid-cols-2 gap-4 px-24 py-8 md:grid-cols-6'>
                    {
                        Object.entries(footer).map(([key, value]) => {
                            return (
                                <div className="grid grid-cols-2  py-8 md:grid-cols-2">
                                    <div>
                                        <h6 className="mb-6 text-sm font-semibold text-gray-500 uppercase ">{key}</h6>
                                        <ul className="text-gray-500 ">
                                            {
                                                value.map((item) => {
                                                    return (
                                                        <li className="mb-4">
                                                            <a href="#" className="hover:underline">{item}</a>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                {/* <div className=''></div> */}
                <div className="px-24  py-12 md:flex md:items-center md:justify-between">
                    <span className=" text-gray-900 text-lg sm:text-center"><a href="https://flowbite.com/">Untitled UI</a>
                    </span>
                    <div className="flex mt-4 space-x-6 sm:justify-center md:mt-0 text-gray-500">
                        © 2077 Untitled UI. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>

    )
}

export default Home