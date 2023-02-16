import React from 'react'
import Image from 'next/image'
import { Inter } from '@next/font/google';
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

import axios from 'axios';




interface Article {
  id: number;
  attributes: {
    data: string;
    title: string;
    description: string;
    author: string;
    category: Category;
    enabled: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    slug: string;
    image: {
      data: {
        id: number;
        attributes: {
          name: string;
          alternativeText: null | string;
          caption: null | string;
          width: number;
          height: number;
          formats: {
            large: {
              ext: string;
              url: string;
              hash: string;
              mime: string;
              name: string;
              path: null;
              size: number;
              width: number;
              height: number;
            };
            small: {
              ext: string;
              url: string;
              hash: string;
              mime: string;
              name: string;
              path: null;
              size: number;
              width: number;
              height: number;
            };
            medium: {
              ext: string;
              url: string;
              hash: string;
              mime: string;
              name: string;
              path: null;
              size: number;
              width: number;
              height: number;
            };
            thumbnail: {
              ext: string;
              url: string;
              hash: string;
              mime: string;
              name: string;
              path: null;
              size: number;
              width: number;
              height: number;
            };
          };
          hash: string;
          ext: string;
          mime: string;
          size: number;
          url: string;
          previewUrl: null | string;
          provider: string;
          provider_metadata: null | object;
          created_at: string;
          updated_at: string;
        };
      };
    };
  };
}
interface Category {
  data: {
    id: number;
    attributes: {
      slug: string;
      title: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  }

}
interface Response {
  data: Article[] | [];
  // meta:{
  //   pagination:{
  //     page:number;
  //     pageSize:number;
  //     pageCount:number;
  //     total:number;
  //   }
  // }
}





// type Blog = {
//   title: string;
//   description: string;

//   image: string;
//   data: string;
//   postedDate: string;
//   category: string;
//   author: string;
//   timeTORead: number;
//   url: string;
//   id: string;
// }


// let articles: Article[] = [];
async function fetchBlogs(slug: string) {
  // try {
  let url = '';

  if (slug == 'all') {

    url = 'http://127.0.0.1:1337/api/blogs?populate=*';
  }
  else {
    // localhost:1337/api/blogs?filters[category][slug]=development&populate=*
    // if its not all use slug to get the category
    url = `http://127.0.0.1:1337/api/blogs?filters[category][slug][$eq]=${slug}&populate=*`;
  }

  var response = await fetch(url,
    // caches={''}
  );


  const blogs: Response = await response.json();

  return blogs.data;

}




async function Page({
  params,
}: {
  params: { slug: string };
}) {
  let blogs = await fetchBlogs(params.slug);
  return (

    <div className={` ${inter.className} my-10 grid grid-cols-1 auto-rows-min lg:grid-cols-2 gap-4`} style={{ gap: '1' }}>
      {

        blogs.map((blog, index) => (

          <div className=" max-w-sm sm:max-w-lg md:max-w-xl xl:max-w-2xl 2xl:max-w-3xl p-0 mt-0 mx-5 aspect-auto " key={index}>
            <a href="#" className='relative'>

              <img
                width={700}
                height={700}
                className='rounded-t-lg h-3/5 object-cover  ' src={`http://127.0.0.1:1337${blog.attributes.image.data.attributes.formats.large.url}`
                }>
              </img>
              <div className="absolute bottom-0 w-full py-6 backdrop-filter backdrop-blur-xl  border-white border-t">
                <div className="text-white text-sm px-4 flex justify-between py-2  rounded-t-lg">
                  <div>
                    <p className="font-semibold">{blog.attributes.author}</p>
                    <p className="opacity-80">{blog.attributes.createdAt}</p>
                  </div>
                  <p className="opacity-80 font-semibold">
                    {blog.attributes.category.data.attributes.title}
                  </p>
                </div>
              </div>

            </a>

            <div className="py-5 ">
              <a href="#">
                <h5 className="mb-2 text-2xl font-medium tracking-tight text-gray-900 ">{blog.attributes.title}</h5>
              </a>
              <p className="mb-3 text-sm font-light text-gray-900">{blog.attributes.description}</p>
              <a href={`http://localhost:3000/blog/${blog.id}`}
                style={{ color: '#6941C6' }}
                className="inline-flex items-center  py-2 text-sm font-medium ">
                Read post


                <svg xmlns="http://www.w3.org/2000/svg" className='w-4 h-4 ml-2 -mr-1 hover:mr-0' viewBox="0 0 20 20"><g id="Layer_2" data-name="Layer 2"><g id="diagonal-arrow-right-up"><g id="diagonal-arrow-right-up-2" data-name="diagonal-arrow-right-up"><rect style={{ fill: '#fff', opacity: 0 }}

                  width="24" height="24" transform="translate(24 24) rotate(180)" /><path style={{ fill: '#6941C6' }} d="M18,7.05a1,1,0,0,0-1-1L9,6H9A1,1,0,0,0,9,8l5.56,0L6.29,16.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L16,9.42V15a1,1,0,0,0,1,1h0a1,1,0,0,0,1-1Z" /></g></g></g></svg>

              </a>

            </div>
          </div>
        )
        )
      }


    </div>
    // <>
    //   <div>
    //     {blogs.map((article, index) => (blog.attributes.title))}
    //   </div>
    // </>
  );
}

export default Page