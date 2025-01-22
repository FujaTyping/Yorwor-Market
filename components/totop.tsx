"use client";

import React from 'react'
import ScrollToTop from "react-scroll-up"
import { AiOutlineToTop } from "react-icons/ai";

function ToTop() {
    return (
        <>
            <ScrollToTop showUnder={160}>
                <div className='bg-red-500 rounded-lg p-2 text-white'>
                    <AiOutlineToTop className='w-8 h-8' />
                </div>
            </ScrollToTop>
        </>
    )
}

export default ToTop