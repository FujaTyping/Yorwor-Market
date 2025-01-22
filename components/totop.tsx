"use client";

import React from 'react'
import ScrollToTop from "react-scroll-up"
import { AiOutlineToTop } from "react-icons/ai";

function ToTop() {
    return (
        <>
            <ScrollToTop showUnder={160}>
                <div className='z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-small gap-2 rounded-medium px-0 !gap-0 transition-transform-colors-opacity motion-reduce:transition-none bg-red-500 text-white min-w-10 w-10 h-10 data-[hover=true]:opacity-hover'>
                    <AiOutlineToTop className='w-8 h-8' />
                </div>
            </ScrollToTop>
        </>
    )
}

export default ToTop