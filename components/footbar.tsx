import YorworLogo from "@/app/favicon.ico";
import Link from "next/link";
import Script from "next/script";
import ToTop from "./totop";

export const Footbar = () => {
  return (
    <>
      <ToTop />
      <footer className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 py-10 px-10 font-sans tracking-wide border-solid border-t-5 border-red-500">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex flex-row items-center justify-center gap-3">
            <img src={YorworLogo.src} alt="Logo" />
            <div className="text-left">
              <p className="text-white AnakotmaiBOLD">Yorwor Market</p>
              <p className="text-white text-sm AnakotmaiBOLD">Hatyaiwittayalai School</p>
            </div>
          </div>
          <p className="text-sm mt-8 text-white">
            Yorwor Market คือเว็บไซต์ซื้อขายสินค้าที่ออกแบบมาโดยเฉพาะสำหรับนักเรียนและบุคลากรโรงเรียนหาดใหญ่วิทยาลัย เรามุ่งเน้นการสร้างแพลตฟอร์มที่ใช้งานง่าย ปลอดภัย และสะดวกสบาย เพื่อสนับสนุนการซื้อขายภายในชุมชนโรงเรียน
          </p>
        </div>

        <hr className="my-10 mt-8 border-white-500" />

        <div className="flex max-md:flex-col gap-4">
          <ul className="flex flex-wrap gap-4">
            <Link href={"/terms"}>
              <li className="text-sm">
                <p className='text-white'>ข้อตกลงและเงื่อนไขการใช้บริการ</p>
              </li>
            </Link>
            <Link href={"/privacy"}>
              <li className="text-sm">
                <p className='text-white'>นโยบายความเป็นส่วนตัว</p>
              </li>
            </Link>
            <li className="text-sm">
              <div>
                <a href="//www.dmca.com/Protection/Status.aspx?ID=840d3032-64f8-4843-9b11-3ebe6b2c100a" title="DMCA.com Protection Status" className="dmca-badge">
                  <img className="h-6" src="https://images.dmca.com/Badges/DMCA_logo-grn-btn120w.png?ID=840d3032-64f8-4843-9b11-3ebe6b2c100a" alt="DMCA.com Protection Status" />
                </a>
              </div>
            </li>
          </ul>
          <p className='text-sm text-white mt-3 sm:mt-0 md:ml-auto sm:text-right'>
            Copyright &copy; 2025 ผู้จัดทำโครงงาน {"(สงวนลิขสิทธิ์ ทั้งหมด)"}
            <br />
            yorwor@siraphop.me
          </p>
        </div>
      </footer>
      <Script src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js" />
    </>
  );
};
