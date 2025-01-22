import YorworLogo from "@/app/favicon.ico";
import Link from "next/link";

export const Footbar = () => {
  return (
    <>
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
            <Link href={"#"}>
              <li className="text-sm">
                <p className='text-white'>ข้อตกลงและเงื่อนไขการใช้บริการ</p>
              </li>
            </Link>
            <Link href={"#"}>
              <li className="text-sm">
                <p className='text-white'>นโยบายความเป็นส่วนตัว</p>
              </li>
            </Link>
          </ul>
          <p className='text-sm text-white mt-3 sm:mt-0 md:ml-auto sm:text-right'>
            Copyright &copy; 2025 ผู้จัดทำโครงงาน {"(สงวนลิขสิทธิ์ ทั้งหมด)"}
            <br />
            yorwor@siraphop.me
          </p>
        </div>
      </footer>
    </>
  );
};
