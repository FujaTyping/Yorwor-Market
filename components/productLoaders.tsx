import React from "react";
import { Skeleton } from "@heroui/skeleton";
import { Card } from "@heroui/card";

function ProductLoaders() {
  return (
    <>
      <div className="mt-4 mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {[...Array(10)].map((_, index) => (
          <Card
            key={index}
            className="w-[150px] md:w-[200px] space-y-5 p-4"
            radius="lg"
          >
            <Skeleton className="rounded-lg h-32">
              <div className="h-24 rounded-lg bg-default-300" />
            </Skeleton>
            <div className="space-y-3">
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-default-200" />
              </Skeleton>
              <Skeleton className="w-4/5 rounded-lg">
                <div className="h-3 w-4/5 rounded-lg bg-default-200" />
              </Skeleton>
              <Skeleton className="w-2/5 rounded-lg">
                <div className="h-3 w-2/5 rounded-lg bg-default-300" />
              </Skeleton>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

export default ProductLoaders;
