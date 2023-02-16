/*
This example requires some changes to your config:



```
// tailwind.config.js
module.exports = {
// ...
plugins: [
// ...
require('@tailwindcss/forms'),
],
}
```
*/

import { Inter } from "@next/font/google"

const inter = Inter({ subsets: ['latin'] })



function EmailBox(
props:{
    textbg:boolean
    disableResponsive:boolean
}

) {
    const {textbg,disableResponsive} = props
    return (<form className={`my-5 sm:${disableResponsive?'flex-none':'flex'}  `}>
        <label htmlFor="email-address" className="sr-only">
            Email address
        </label>
        <div>

            <input id="email-address" name="email" type="email" autoComplete="email" required className="w-full rounded-md border-gray-300 px-5 py-3 max-w-sm placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500" placeholder="Enter your email" />
            <p className={` text-sm mt-1.5 mb-4 ${textbg? 'text-gray-800':'text-gray-200'} font-light`}>We care about your data in our <u>
                privacy policy.
            </u>
            </p>
        </div>
        <div className="mt-3 rounded-md sm:mt-0 sm:ml-4 sm:flex-shrink-0">
            <button type="submit" className="flex w-full items-center justify-center rounded-md border border-transparent bg-purple-600 px-5 py-3 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                Subscribe
            </button>
        </div>
    </form>);
}


function Subscribe() {
    return (
        <div className={`bg-gray-800 ${inter.className} py-24 flex flex-col items-center`}>
            <h5 className=" text-4xl text-center font-semibold text-white">Sign up for our newsletter</h5>
            <p className=" font-light text-gray-200 text-center text-lg lg:text-xl my-5">Be the first to know about releases and industry news and insights.</p>
            <EmailBox textbg={false} disableResponsive={false} ></EmailBox>
        </div>
    )
}

export { Subscribe,EmailBox}