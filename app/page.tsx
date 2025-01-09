"use client";

import { useState } from "react";
import { Button } from "@nextui-org/button";

export default function Home() {
  const [title] = useState("Yorwor Market")
  return (
    <>
      <title>{title}</title>
      <div className="h-screen flex flex-col items-center justify-center">
        <Button color="primary">Button</Button>
      </div>
    </>
  );
}
