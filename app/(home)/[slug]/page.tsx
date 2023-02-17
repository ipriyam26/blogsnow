import React from 'react'
import { Inter } from '@next/font/google';
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})


interface Author {
  data: {
    id: number;
    attributes: {
      Name: string;
      slug: string;
    }
  }
}


interface Article {
  id: number;
  attributes: {
    data: string;
    title: string;
    description: string;
    author: Author;
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

}

async function fetchBlogs(slug: string) {
  // try {
  let url = '';

  if (slug == 'all') {

    url = 'http://127.0.0.1:1337/api/blogs?populate=*';
  }
  else {

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

    <div className={` ${inter.className} md:mx-8 md:grid md:grid-cols-2 md:justify-start  `} >
      {

        blogs.map((blog, index) => {
          const dateRegex = /^(\d{4})-(\d{2})-(\d{2})T/;
          const match = dateRegex.exec(blog.attributes.publishedAt);
        
        
          const year = match![1];
          const month = new Date(Number(year), Number(match![2]) - 1, Number(match![3])).toLocaleString('default', { month: 'short' });
          const day = match![3];
          const posted = `${day} ${month}`; 
return(
          <div className="  p-0  mx-7 my-8  aspect-auto " key={blog.id}>
            <a href="#" className='relative'>

              <img
                width={600}
                height={300}
                className=' h-60 md:h-72' src={`http://127.0.0.1:1337${blog.attributes.image.data.attributes.formats.large.url}`
                }>
              </img>
              <div className="absolute bottom-0 w-full md:py-6  py-4 backdrop-filter backdrop-blur-xl  border-white border-t">
                <div className="text-white text-sm px-4 flex justify-between   rounded-t-lg">
                  <div>
                    <p className="font-semibold">{blog.attributes.author.data.attributes.Name}</p>
                    <p className="opacity-80">{posted}</p>
                  </div>
                  <p className="opacity-80 font-semibold">
                    {blog.attributes.category.data.attributes.title}
                  </p>
                </div>
              </div>

            </a>

            <div className="mt-6 md:mt-8">
              <a href="#">
                <h5 className="mb-2 text-2xl font-medium tracking-tight text-gray-900 ">{blog.attributes.title}</h5>
              </a>
              <p className="mb-3 text-sm font-light text-gray-900">{blog.attributes.description}</p>
              <a href={`http://localhost:3000/blog/${blog.id}`}
                style={{ color: '#6941C6' }}
                className="inline-flex items-center  pt-2 text-sm font-medium ">
                Read post


                <svg xmlns="http://www.w3.org/2000/svg" className='w-4 h-4 ml-2 -mr-1 hover:mr-0' viewBox="0 0 20 20"><g id="Layer_2" data-name="Layer 2"><g id="diagonal-arrow-right-up"><g id="diagonal-arrow-right-up-2" data-name="diagonal-arrow-right-up"><rect style={{ fill: '#fff', opacity: 0 }}

                  width="24" height="24" transform="translate(24 24) rotate(180)" /><path style={{ fill: '#6941C6' }} d="M18,7.05a1,1,0,0,0-1-1L9,6H9A1,1,0,0,0,9,8l5.56,0L6.29,16.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L16,9.42V15a1,1,0,0,0,1,1h0a1,1,0,0,0,1-1Z" /></g></g></g></svg>

              </a>

            </div>
          </div>);
}
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