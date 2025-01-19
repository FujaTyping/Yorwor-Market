import type { ElysiaApp } from "../../app";
import axios from "axios";

export default (app: ElysiaApp) =>
    app
        .post("/", async ({ body }) => {
            const { email, name, ux, topic, text } = body;

            if (!email || !name || !ux || !topic || !text) {
                return { error: true, message: "Missing request details" };
            }

            try {
                const Url = process.env.marketHook;
                const Payload = {
                    "embeds": [
                        {
                            "title": "🎈 มีคนสางข้อความมีถึง Yorwor Market",
                            "description": `**${name}** : ${text}`,
                            "color": 4892137,
                            "fields": [
                                {
                                    "name": "อีเมล",
                                    "value": `${email}`
                                },
                                {
                                    "name": "หัวข้อ",
                                    "value": `${topic}`,
                                    "inline": true
                                },
                                {
                                    "name": "ประสบการณ์การใช้งาน",
                                    "value": `${ux}`,
                                    "inline": true
                                }
                            ],
                            "author": {
                                "name": "Market - Notify",
                                "url": `market.yorwor.siraphop.me/contact`,
                                "icon_url": "https://upload.wikimedia.org/wikipedia/commons/6/6f/ตรีจักร.png"
                            },
                            "footer": {
                                "text": "กรุณาตรวจสอบ !"
                            }
                        }
                    ]
                };
                axios.post(Url, Payload)
                return "Successfuly send a request to admin";
            } catch (error: any) {
                return {
                    error: true,
                    message: error.message || "An error occurred while post a report",
                };
            }
        });
