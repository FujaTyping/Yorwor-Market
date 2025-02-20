import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/grid";

import Link from "next/link";

import EduCar from "@/assets/media/icon/Edu.webp";
import FoodCar from "@/assets/media/icon/Food.webp";
import DrinkCar from "@/assets/media/icon/Drink.webp";
import FasionCar from "@/assets/media/icon/Fashion.webp";
import HandCar from "@/assets/media/icon/Hand.webp";
import GoodCar from "@/assets/media/icon/Good.webp";
import DecoCar from "@/assets/media/icon/Decorate.webp";
import GadCar from "@/assets/media/icon/Gadget.webp";
import TeacherCar from "@/assets/media/icon/Teacher.webp";

function CategoryGrid() {
  return (
    <>
      <Swiper
        breakpoints={{
          768: {
            slidesPerView: 6,
            spaceBetween: 50,
            grid: {
              rows: 1,
              fill: "row",
            },
          },
        }}
        grid={{
          rows: 2,
          fill: "row",
        }}
        modules={[Grid, Mousewheel]}
        mousewheel={true}
        slidesPerView={3}
        spaceBetween={30}
      >
        <SwiperSlide>
          <Link
            className="flex flex-col items-center justify-center gap-2 hover:scale-105 transition-all"
            href={"/goods/category?type=อุปกรณ์การเรียน"}
          >
            <img
              alt="Edu"
              className="h-16 md:h-20 transition-transform duration-300"
              src={EduCar.src}
            />
            <p className="AnakotmaiBOLD">อุปกรณ์การเรียน</p>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link
            className="flex flex-col items-center justify-center gap-2 hover:scale-105 transition-all"
            href={"/goods/category?type=อาหาร"}
          >
            <img alt="Food" className="h-16 md:h-20" src={FoodCar.src} />
            <p className="AnakotmaiBOLD">อาหาร</p>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link
            className="flex flex-col items-center justify-center gap-2 hover:scale-105 transition-all"
            href={"/goods/category?type=เครื่องดื่ม"}
          >
            <img alt="Drink" className="h-16 md:h-20" src={DrinkCar.src} />
            <p className="AnakotmaiBOLD">เครื่องดื่ม</p>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link
            className="flex flex-col items-center justify-center gap-2 hover:scale-105 transition-all"
            href={"/goods/category?type=สินค้าแฟชั่น"}
          >
            <img alt="Fashion" className="h-16 md:h-20" src={FasionCar.src} />
            <p className="AnakotmaiBOLD">สินค้าแฟชั่น</p>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link
            className="flex flex-col items-center justify-center gap-2 hover:scale-105 transition-all"
            href={"/goods/category?type=สินค้าจาก คุณครู"}
          >
            <img alt="Teacher" className="h-16 md:h-20" src={TeacherCar.src} />
            <p className="AnakotmaiBOLD">สินค้าจาก คุณครู</p>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link
            className="flex flex-col items-center justify-center gap-2 hover:scale-105 transition-all"
            href={"/goods/category?type=แกดเจ็ต"}
          >
            <img alt="Gadget" className="h-16 md:h-20" src={GadCar.src} />
            <p className="AnakotmaiBOLD">แกดเจ็ต</p>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link
            className="flex flex-col items-center justify-center gap-2 hover:scale-105 transition-all"
            href={"/goods/category?type=ของตกแต่ง"}
          >
            <img alt="Deco" className="h-16 md:h-20" src={DecoCar.src} />
            <p className="AnakotmaiBOLD">ของตกแต่ง</p>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link
            className="flex flex-col items-center justify-center gap-2 hover:scale-105 transition-all"
            href={"/goods/category?type=ของมือ 2"}
          >
            <img alt="Hand" className="h-16 md:h-20" src={HandCar.src} />
            <p className="AnakotmaiBOLD">ของมือ 2</p>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link
            className="flex flex-col items-center justify-center gap-2 hover:scale-105 transition-all"
            href={"/goods/category?type=อื่นๆ"}
          >
            <img alt="Good" className="h-16 md:h-20" src={GoodCar.src} />
            <p className="AnakotmaiBOLD">อื่นๆ</p>
          </Link>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default CategoryGrid;
