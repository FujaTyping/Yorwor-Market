import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/grid';

import Link from "next/link";
import EduCar from "@/assets/media/icon/Edu.webp"
import FoodCar from "@/assets/media/icon/Food.webp"
import DrinkCar from "@/assets/media/icon/Drink.webp"
import FasionCar from "@/assets/media/icon/Fashion.webp"
import HandCar from "@/assets/media/icon/Hand.webp"
import GoodCar from "@/assets/media/icon/Good.webp"
import DecoCar from "@/assets/media/icon/Decorate.webp"

function CategoryGrid() {
    return (
        <>
            <Swiper
                spaceBetween={30}
                slidesPerView={3}
                grid={{
                    rows: 2,
                    fill: "row"
                }}
                breakpoints={{
                    768: {
                        slidesPerView: 6,
                        spaceBetween: 50,
                        grid: {
                            rows: 1,
                            fill: "row"
                        }
                    }
                }}
                modules={[Grid]}
            >
                <SwiperSlide>
                    <Link
                        href={"/goods/category?type=อุปกรณ์การเรียน"}
                        className="flex flex-col items-center justify-center gap-2 hover:scale-105 transition-all"
                    >
                        <img
                            src={EduCar.src}
                            alt="Edu"
                            className="h-16 md:h-20 transition-transform duration-300"
                        />
                        <p className="AnakotmaiBOLD">อุปกรณ์การเรียน</p>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link href={"/goods/category?type=อาหาร"} className="flex flex-col items-center justify-center gap-2 hover:scale-105 transition-all">
                        <img src={FoodCar.src} alt="Food" className="h-16 md:h-20" />
                        <p className="AnakotmaiBOLD">อาหาร</p>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link href={"/goods/category?type=เครื่องดื่ม"} className="flex flex-col items-center justify-center gap-2 hover:scale-105 transition-all">
                        <img src={DrinkCar.src} alt="Drink" className="h-16 md:h-20" />
                        <p className="AnakotmaiBOLD">เครื่องดื่ม</p>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link href={"/goods/category?type=สินค้าแฟชั่น"} className="flex flex-col items-center justify-center gap-2 hover:scale-105 transition-all">
                        <img src={FasionCar.src} alt="Fashion" className="h-16 md:h-20" />
                        <p className="AnakotmaiBOLD">สินค้าแฟชั่น</p>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link href={"/goods/category?type=ของตกแต่ง"} className="flex flex-col items-center justify-center gap-2 hover:scale-105 transition-all">
                        <img src={DecoCar.src} alt="Deco" className="h-16 md:h-20" />
                        <p className="AnakotmaiBOLD">ของตกแต่ง</p>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link href={"/goods/category?type=สินค้ามือ 2"} className="flex flex-col items-center justify-center gap-2 hover:scale-105 transition-all">
                        <img src={HandCar.src} alt="Hand" className="h-16 md:h-20" />
                        <p className="AnakotmaiBOLD">สินค้ามือ 2</p>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link href={"/goods/category?type=อื่นๆ"} className="flex flex-col items-center justify-center gap-2 hover:scale-105 transition-all">
                        <img src={GoodCar.src} alt="Good" className="h-16 md:h-20" />
                        <p className="AnakotmaiBOLD">อื่นๆ</p>
                    </Link>
                </SwiperSlide>
            </Swiper>
        </>
    )
}

export default CategoryGrid