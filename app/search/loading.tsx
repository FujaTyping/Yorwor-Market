import React from "react";

function loading() {
  return (
    <>
      <div className="flex flex-col items-center justify-center mt-8">
        <h1 className="text-2xl md:text-3xl mb-2 AnakotmaiBOLD">ค้นหาสินค้า</h1>
        <div className="flex">
          <div className="h-1 w-20 bg-blue-500 rounded-l-lg"></div><div className="h-1 w-20 bg-red-500 rounded-r-lg"></div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-5 my-5 mx-10">
        <div className="flex flex-col items-center justify-center gap-4 mt-5 h-72">
          <div className="flex-col gap-4 w-full flex items-center justify-center">
            <div className="w-28 h-28 border-4 text-blue-500 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-500 rounded-full">
              <img src="/favicon.ico" className="animate-ping" alt="YW-Loading" />
            </div>
          </div>
          <p className="AnakotmaiBOLD">กำลังโหลด</p>
        </div>
      </div>
    </>
  );
}

export default loading;
