import type { ElysiaApp } from "../../app";
import axios from "axios";

export default (app: ElysiaApp) =>
    app
        .post("/good", async ({ body }) => {
            const { gID, reason } = body;

            if (!gID || !reason) {
                return { error: true, message: "Missing report details" };
            }

            try {
                const Url = process.env.marketHook;
                const Payload = {
                    "embeds": [
                        {
                            "title": "⁉ แจ้งเตือนรายงานสินค้าสำหรับ Yorwor Market",
                            "description": `ลิ้งค์ : https://market.yorwor.siraphop.me/product?id=${gID}`,
                            "color": 4892137,
                            "fields": [
                                {
                                    "name": "เหตุผล",
                                    "value": `${reason}`
                                }
                            ],
                            "author": {
                                "name": "Market - Notify",
                                "url": `https://market.yorwor.siraphop.me/product?id=${gID}`,
                                "icon_url": "https://upload.wikimedia.org/wikipedia/commons/6/6f/ตรีจักร.png"
                            },
                            "footer": {
                                "text": "กรุณาตรวจสอบให้เร็วที่สุด !"
                            }
                        }
                    ]
                };
                axios.post(Url, Payload)
                return "Successfuly send a repost to admin";
            } catch (error: any) {
                return {
                    error: true,
                    message: error.message || "An error occurred while post a report",
                };
            }
        });
