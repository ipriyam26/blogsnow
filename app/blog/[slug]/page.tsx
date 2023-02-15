import { inter } from '@/app/layout';
import React from 'react'
import ReactMarkdown from 'react-markdown'
import Image from 'next/image';
type id = string;

type metaData = {
  postedDate: string;
  category: string;
  author: string;
  timeTORead: number;
  url: string;
  id: id;
}

type Blog = {
  id: id;
  title: string;
  description: string;
  metaData: metaData;
  image: string;
  data: string;
}

const blog: Blog = {
  id: "123",
  title: "10 Tips for Better Time Management",
  description: "Are you struggling with managing your time effectively? Here are 10 tips to help you improve your time management skills.",
  metaData: {
    postedDate: "1 Dec 2022",
    category: "Productivity",
    author: "Jane Smith",
    timeTORead: 5,
    url: "/articles/123",
    id: "123"
  },
  image: "https://images.unsplash.com/photo-1676313683415-5bcd3771a56c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80",
  data: "# 10 Tips for Better Time Management\n\nTime management is an essential skill that can help you become more productive, reduce stress, and achieve your goals. However, it\'s not always easy to manage your time effectively, especially when you have a lot of tasks to complete.\n\nIn this article, we\'ll share ten tips for better time management to help you make the most of your day.\n\n## 1. Prioritize Your Tasks\n\nStart by making a list of all the tasks you need to complete. Then, prioritize them based on their urgency and importance. This will help you focus on the most critical tasks and ensure that you\'re making progress towards your goals.\n\n## 2. Set Goals\n\nSetting goals is an essential part of time management. It helps you stay focused and motivated, and it gives you a clear direction for your work. Make sure your goals are specific, measurable, achievable, relevant, and time-bound (SMART).\n\n## 3. Create a Schedule\n\nOnce you\'ve prioritized your tasks and set your goals, create a schedule for your day or week. This will help you stay organized and ensure that you have enough time to complete all your tasks.\n\n## 4. Avoid Procrastination\n\nProcrastination is one of the biggest enemies of time management. To avoid procrastination, break your tasks into smaller, manageable chunks, and work on them consistently.\n\n## 5. Use Time-Blocking\n\nTime-blocking is a time management technique that involves breaking your day into blocks of time and assigning specific tasks to each block. This technique can help you stay focused and avoid distractions.\n\n## 6. Take Breaks\n\nTaking breaks is essential for maintaining your productivity and focus. Make sure to schedule regular breaks throughout your day, and use them to rest, recharge, and refocus.\n\n## 7. Use Technology\n\nThere are many time management tools and apps that can help you manage your time more effectively. Experiment with different tools and find the ones that work best for you.\n\n## 8. Delegate Tasks\n\nDelegating tasks is an excellent way to save time and reduce your workload. Identify the tasks that can be delegated, and delegate them to your team members or colleagues.\n\n## 9. Say No\n\nSaying no is essential for managing your time effectively. Learn to say no to tasks or commitments that are not aligned with your goals or priorities.\n\n## 10. Review and Adjust\n\nFinally, it\'s essential to regularly review and adjust your time management strategies. Reflect on what\'s working and what\'s not, and make changes as needed to ensure that you\'re making the most of your time.\n\nIn conclusion, time management is a skill that can be developed and improved over time. By following these ten tips, you can become more productive, reduce stress, and achieve your goals.\n\n![Time Management Image](https://images.unsplash.com/photo-1676328122059-d847707ee400?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=972&q=80)\n"
};



function Chip() {
  return (<div className='inline-flex  rounded-3xl items-center text-sm text-purple-700 bg-purple-50  px-3 py-1 space-x-4'>
    <h3 className='px-2 py-1  rounded-3xl bg-white'>{blog.metaData.category}</h3>
    <p>{`${blog.metaData.timeTORead} min read`}</p>
  </div>);
}



interface MarkdownProps {
  content: string;
}

// const Markdown: React.FC<MarkdownProps> = ({ content }) => {
//   return (
//     <ReactMarkdown
//       source={content}
//       className="prose lg:prose-xl"
//       renderers={{
//         heading: (props: { level: any; children: any; }) => {
//           const Tag = `h${props.level}`;
//           const tailwindClasses = {
//             'h1': 'text-4xl font-bold mb-6',
//             'h2': 'text-3xl font-bold mb-4',
//             'h3': 'text-2xl font-bold mb-3',
//             'h4': 'text-xl font-bold mb-2',
//             'h5': 'text-lg font-bold mb-1',
//             'h6': 'text-base font-bold mb-1',
//           };
//           return <Tag className={tailwindClasses[`h${props.level}`]}>{props.children}</Tag>;
//         },
//       }}
//     />
//   );
// };


function Layout() {

  return (
    <div className={`${inter.className} lg:py-24 py-16 mx-4 lg:mx-28`}>
      <Chip></Chip>
      <h1 className='text-4xl my-4 font-semibold'>
        {blog.title}
      </h1>
      <h3 className='text-xl mb-16 lg:w-3/5 text-gray-600'>
        {blog.description}
      </h3>
      <Image
        src={blog.image}
        alt='random'
        width={1000}
        height={1000}
        className='mb-8'
      ></Image>
      <div className='flex'>
        <div className='' >
          <p className='font-semibold text-purple-600 text-lg'>Written by</p>
          <h5 className=' text-gray-900 mt-3 text-xl'>{blog.metaData.author}</h5>
        </div>
        <div className='lg:ml-16 ml-12' >
          <p className='font-semibold text-purple-600 text-lg'>Published on</p>
          <h5 className=' text-gray-900 mt-3 text-xl'>{blog.metaData.postedDate}</h5>
        </div>
      </div>
      <div className='mt-16 prose prose-p:text-lg flex flex-col'>
        <ReactMarkdown>{blog.data}</ReactMarkdown>
      </div>
    </div>
  )
}

export default Layout