import React from 'react'
import Image from 'next/image'
import { faker } from '@faker-js/faker';
import { Inter } from '@next/font/google';
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

interface Article {
  id: number;
  title: string;
  description: string;
  image: string;
  url: string;
  date: string;
  category: string;
  author: string;
}

let articles: Article[] = [];

for (let i = 1; i <= 10; i++) {

var dateString = faker.date.past().toISOString();
const date = new Date(dateString);

const options:Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);
const category = faker.random.word();
  const article: Article = {
    id: i,
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    image: faker.image.imageUrl(),
    url: faker.internet.url(),
    author: faker.name.findName(),
    date: formattedDate,
    category: category.charAt(0).toUpperCase() + category.slice(1)
  };
  articles.push(article);
}


function Page({
  params,
}: {
  params: { slug: string };
}) {
  console.log(params.slug);
  return (
    <div className={` ${inter.className} my-10 grid grid-cols-1 auto-rows-min lg:grid-cols-2 gap-4`} style={{ gap: '1' }}>
      {
        articles.map((article, index) => (

          <div className=" max-w-sm sm:max-w-lg md:max-w-xl xl:max-w-2xl 2xl:max-w-3xl p-0 mt-0 mx-5 aspect-auto " key={index}>
            <a href="#" className='relative'>
              <Image
                width={800}
                height={400}

                className=" rounded-t-lg h-3/5 object-cover" src={article.image} alt="" />
              <div className="absolute bottom-0 w-full py-6 backdrop-filter backdrop-blur-xl  border-white border-t">
                <div className="text-white text-sm px-4 flex justify-between py-2  rounded-t-lg">
               <div>
                 
                 <p className="font-semibold">{article.author}</p>
                 <p className="opacity-80">{article.date}</p>
               </div>
                  <p className="opacity-80 font-semibold">{article.category}</p>
                </div>
              </div>


            </a>
            <div className="py-5 ">
              <a href="#">
                <h5 className="mb-2 text-2xl font-medium tracking-tight text-gray-900 ">{article.title}</h5>
              </a>
              <p className="mb-3 text-sm font-light text-gray-900">{article.description}</p>
              <a href={article.url}
                style={{ color: '#6941C6' }}
                className="inline-flex items-center  py-2 text-sm font-medium ">
                Read post


                <svg xmlns="http://www.w3.org/2000/svg" className='w-4 h-4 ml-2 -mr-1 hover:mr-0' viewBox="0 0 20 20"><g id="Layer_2" data-name="Layer 2"><g id="diagonal-arrow-right-up"><g id="diagonal-arrow-right-up-2" data-name="diagonal-arrow-right-up"><rect style={{ fill: '#fff', opacity: 0 }}

                  width="24" height="24" transform="translate(24 24) rotate(180)" /><path style={{ fill: '#6941C6' }} d="M18,7.05a1,1,0,0,0-1-1L9,6H9A1,1,0,0,0,9,8l5.56,0L6.29,16.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L16,9.42V15a1,1,0,0,0,1,1h0a1,1,0,0,0,1-1Z" /></g></g></g></svg>

              </a>

            </div>
          </div>
        ))
      }


    </div>
  )
}

export default Page