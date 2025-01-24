import React from "react";
import Loaders from "@/components/loaders";

function loading() {
  return (
    <>
      <div className="flex flex-col items-center justify-center mt-8">
        <h1 className="text-3xl md:text-4xl mb-2 AnakotmaiBOLD">ข้อมูลสินค้า</h1>
        <div className="flex">
          <div className="h-1 w-20 bg-blue-500 rounded-l-lg"></div><div className="h-1 w-20 bg-red-500 rounded-r-lg"></div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-5 my-5 mx-10">
        <Loaders />
      </div>
    </>
  );
}

export default loading;
