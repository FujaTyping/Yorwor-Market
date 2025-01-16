import YorworLogo from "@/app/favicon.ico"

export const Footbar = () => {
  return (
    <>
      <footer>
        <div className="mx-auto max-w-screen-xl px-4 py-5 lg:px-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex justify-center text-teal-600 sm:justify-start">
              <img src={YorworLogo.src} className="h-8" alt="Logo" />
            </div>
            <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
              Copyright &copy; 2025 All rights reserved
            </p>
          </div>
        </div>
      </footer>

    </>
  );
};
