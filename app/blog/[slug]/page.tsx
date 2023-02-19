import { Inter } from '@next/font/google';
import React from 'react'
import ReactMarkdown from 'react-markdown'
import Image from 'next/image';
import { redirect, usePathname } from 'next/navigation';
import { unescape } from 'querystring';
import remarkGfm from 'remark-gfm';
type id = string;
import { SlPaperPlane } from 'react-icons/sl'
import { EmailBox } from '@/app/Subscribe';


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

          };

        };
      };
    };
    recommendations: {
      data: Article[]
    }
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
  data: Article[];

}


const footerData = [
  {
    "id": 1,
    "title": "Overview",
    "url": "/info/overview"
  }, {
    "id": 2,
    "title": "Carriers",
    "url": "/info/carriers"
  }, {
    "id": 3,
    "title": "Features",
    "url": "/info/features"
  }, {
    "id": 4,
    "title": "Help",
    "url": "/info/help"
  }, {
    "id": 5,
    "title": "Pricing",
    "url": "/info/pricing"
  }, {
    "id": 6,
    "title": "Pricing",
    "url": "/info/pricing"
  },
]


async function fetchBlog(slug: string) {
  let url = `http://127.0.0.1:1337/api/blogs?filters[slug][$eq]=${slug}&populate=*`;


  var response = await fetch(url,
  );
  let blog: Response = await response.json();
  // console.log(blog.data[0].attributes.title);
  return blog.data[0];

}


const inter = Inter({ subsets: ['latin'] })

function Chip(
  params: {
    category: string | undefined;
    timeTORead: number;
  }
) {
  const { category, timeTORead } = params;
  return (<div className='inline-flex  rounded-3xl items-center text-sm text-purple-700 bg-purple-50  px-3 py-1 space-x-4'>
    <h3 className='px-2 py-1  rounded-3xl bg-white'>{category!}</h3>
    <p>{`${timeTORead} min read`}</p>
  </div>);
}


function findWorkingImage(blog: Article) {
  let image = blog.attributes.image;
  let url = `http://127.0.0.1:1337${image.data.attributes.formats.large.url}`;
  if (url === null) {
    url = `http://127.0.0.1:1337${image.data.attributes.formats.medium.url}`;
  }
  if (url === null) {
    url = 'https://media.tenor.com/2Cd3eA5jeC4AAAAC/cat-cute.gif'

  }
  return url;
}

// function to check if the author is defined if it ain't return dummy data else the author
function findAuthor(blog: Article) {
  let author = "Undefined";
  try{
    author = blog.attributes.author.data.attributes.Name;
  }
  catch{
    author = "Undefined";
  }
  return author;

}

async function Layout(
  {
    params,
  }: {
    params: { slug: string };
  }
) {
  let { slug } = params;
  console.log(slug);
  let blog = await fetchBlog(slug);
  console.log(blog.attributes.title);
  const posted = findDate(blog); // Output: "15 Feb"




  const recommendedPosts = await fetchRecommendations(blog.attributes.recommendations.data);

  return (
    <div className={`${inter.className}`}>
      <div className={` lg:py-24 py-16 mx-4 lg:mx-28`}>
        <Chip category={blog?.attributes.category.data.attributes.title}
          timeTORead={blog?.attributes.data.split(' ').length! / 200 | 1}
        ></Chip>
        <h1 className='text-4xl   my-4 font-semibold'>
          {blog!.attributes.title}
        </h1>
        <h3 className='text-xl mb-16  lg:w-3/5 text-gray-600'>
          {blog!.attributes.description}
        </h3>

        <Image
          // add maximum
          className='rounded-t-lg lg:h-[32rem] lg:max-w-7xl  h-60 object-cover mb-8 ' src={
            findWorkingImage(blog)
          } alt='random'
          width={1216}
          height={516}

        ></Image>
        <div className='flex'>
          <div className='' >
            <p className='font-semibold text-purple-600 text-sm'>Written by</p>
{/* show author if it undefined show Undefined as a string */}
            <h5 className=' text-gray-900 mt-3 text-xl'>{ findAuthor(blog)  }</h5>
          </div>
          <div className='lg:ml-16 ml-6 md:ml-10' >
            <p className='font-semibold text-purple-600 text-sm'>Published on</p>
            <h5 className=' text-gray-900 mt-3 text-xl'>{posted}</h5>
          </div>
        </div>
        <div className="lg:grid lg:grid-cols-5 gap-14 ">
          <div className='flex lg:col-span-3'>
            <div className='mt-16 prose prose-p:text-lg min-w-full flex flex-col'>
              <ReactMarkdown skipHtml={true}
                remarkPlugins={[remarkGfm]}
              >
                {blog!.attributes.data}
              </ReactMarkdown>
            </div>
          </div>
          {/* <div> */}

          <div className='col-span-2'>
            <hr className='my-4'></hr>
            <p className='text-2xl font-semibold '>Popular Posts</p>
            {
              recommendedPosts.map((newPost, index) => {
                return recommendedPost(newPost);
              })
            }
            {/* </div> */}
          </div>
        </div>
      </div>
      <hr className='bg-black text-black md:mx-28' />
      <div className='mx-4 md:grid md:grid-cols-3 md:mx-28'>

        <div className="my-10 rounded-md block md:hidden sm:flex-shrink-0">
          <button type="submit" className="flex  items-center justify-center rounded-md border border-transparent bg-purple-600 px-5 py-3 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
            View all posts
          </button>
        </div>
      </div>

      {Footer()}
    </div>
  )
}

export default Layout


function findDate(blog: Article) {
  const dateRegex = /^(\d{4})-(\d{2})-(\d{2})T/;
  const match = dateRegex.exec(blog.attributes.publishedAt);


  const year = match![1];
  const month = new Date(Number(year), Number(match![2]) - 1, Number(match![3])).toLocaleString('default', { month: 'short' });
  const day = match![3];
  const posted = `${day} ${month}`; // Output: "15 Feb"
  return posted;
}

function Footer() {
  return <footer className="text-gray-600 py-10 bg-gray-800 body-font md:px-20 lg:px-28">
    <div className='md:flex'>
      <div className="container px-5   mx-auto">
        <a className="flex title-font  font-medium items-center md:justify-start justify-start text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-white text-2xl">Untitled UI</span>
        </a>
        <div className="grid grid-cols-2 text-start my-10 md:text-left  order-first">
          {footerData.map((item, index) => {
            return (
              <div key={item.id} className="lg:w-1/4 md:w-1/2 w-full px-4">
                <a href={`${item.url}`}>
                  <h2 className="title-font font-medium text-gray-200 tracking-widest  mb-3">{item.title}</h2>
                </a>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-4  ">
        <p className='text-white my-4 font-semibold'>Stay Up to date</p>
        <form className={`my-5 md:${false ? 'flex-none' : 'flex'} items-center justify-center  `}>
          <div className='md:mr-4'>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>

            <input id="email-address" name="email" type="email" autoComplete="email" required className="w-full md:w-72  rounded-md border-gray-300 px-5 py-3  placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500" placeholder="Enter your email" />

          </div>
          <div className="rounded-md mt-4 md:mt-0   md:flex-shrink-0">
            <button type="submit" className="flex w-full md:w-28 items-center justify-center rounded-md border border-transparent bg-purple-600 px-5 py-3 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
              Subscribe
            </button>
          </div>
        </form>

      </div>
      <hr className="h-px my-10 md:hidden  bg-gray-600 border-0 " />

    </div>
    <hr className="h-px my-10 hidden md:block bg-gray-600 border-0 " />
    <footer className="px-4   rounded-lg shadow md:px-6 md:py-4 bg-gray-800 ">
      <div className="sm:flex sm:items-center sm:justify-between md:hidden">

        <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">Licensing</a>
          </li>
          <li>
            <a href="#" className="hover:underline">Contact</a>
          </li>
        </ul>
      </div>

      <span className="block text-sm text-gray-300   ">© 2077 <a href="https://flowbite.com/" className="hover:underline">Untitled UI.</a>  All rights reserved.
      </span>
    </footer>


  </footer>;
}

function recommendedPost(blog: Article) {
  var posted = findDate(blog);
  return <div key={blog.id} className='max-w-sm my-12 md:mx-2'>
    <a href={`/blog/${blog.attributes.slug}`}>
      <Image
        className='mb-8 h-60'
        height={400}
        width={400}
        alt={blog!.attributes.title}
        src={findWorkingImage(blog)}></Image>
      <Chip category={blog?.attributes.category.data.attributes.title} timeTORead={blog?.attributes.data.split(' ').length! / 200 | 0}></Chip>
      <h4 className='mt-4 mb-2 text-2xl font-semibold flex'>
        {blog!.attributes.title}
        <svg xmlns="http://www.w3.org/2000/svg" className='w-10 h-10 ml-2 -mr-1 hover:mr-0' viewBox="0 0 20 20"><g id="Layer_2" data-name="Layer 2"><g id="diagonal-arrow-right-up"><g id="diagonal-arrow-right-up-2" data-name="diagonal-arrow-right-up"><rect style={{ fill: '#fff', opacity: 0 }}

          width="24" height="24" transform="translate(24 24) rotate(180)" /><path style={{ fill: '' }} d="M18,7.05a1,1,0,0,0-1-1L9,6H9A1,1,0,0,0,9,8l5.56,0L6.29,16.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L16,9.42V15a1,1,0,0,0,1,1h0a1,1,0,0,0,1-1Z" /></g></g></g></svg>
      </h4>
      <p className='text-gray-400 '>
        {blog!.attributes.description}
      </p>
      <div className=''>

        <h5 className=' text-gray-900 mt-3 text-sm font-semibold'>{findAuthor(blog)}</h5>
        <h5 className=' text-gray-600 text-sm font-normal'>{posted}</h5>
      </div>

    </a>
  </div >;
}
async function fetchRecommendations(data: Article[]) {
  var article_list = data.map((article) => {
    return fetchBlog(article.attributes.slug)
  });


  // for (const article in data) {
  //   if (Object.prototype.hasOwnProperty.call(data, article)) {
  //     const element = data[article];
  //     const newBlog = await fetchBlog(element.attributes.slug);
  //     article_list.push(newBlog)

  //   }
  // }




  return await Promise.all(article_list);
}

