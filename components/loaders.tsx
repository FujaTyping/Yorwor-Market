import React from 'react'

function Loaders() {
    return (
        <>
            <div className="flex flex-col items-center justify-center gap-4 -mt-2 h-72">
                <div className="flex-col gap-4 w-full flex items-center justify-center">
                    <div className="w-28 h-28 border-4 text-blue-500 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-500 rounded-full"></div>
                </div>
                <p className="AnakotmaiBOLD">กำลังโหลด</p>
            </div>
        </>
    )
}

export default Loaders