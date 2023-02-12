'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menus = [
    {
        name: 'Home',
        link: '/home/all'
    }, {
        name: 'Design',
        link: '/home/design'
    }, {
        name: 'Development',
        link: '/home/development'
    }, {
        name: 'Management',
        link: '/home/management'
    }, {
        name: 'Product',
        link: '/home/product'
    }, {
        name: 'Support',
        link: '/home/support'
    }
]


export function Localnav() {
    const pathname = usePathname();
    console.log(pathname);
    return (

        <div>

            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px">

                    {
                        menus.map((menu, index) => (
                            // pathname === menu.link ?
                            <li
                                key={index}
                                className="mr-2">
                                <Link href={menu.link} className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg 
                    ${pathname == menu.link ? 'text-blue-600 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500' : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}
                    
                    `}

                                >
                                    {menu.name}
                                </Link>
                            </li>

                        ))
                    }


                </ul>
            </div>

        </div>);
}
