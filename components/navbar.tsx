"use client";

import useLocalStorge from "@/lib/localstorage-db";

export const Navbar = () => {
  const { FireUser } = useLocalStorge();

  return (
    <>
      <h1 className="text-center">
        Navbar {FireUser.uid ? FireUser.email : "No auth found"}
      </h1>
    </>
  );
};
