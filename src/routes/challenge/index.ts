import type { ElysiaApp } from "../../app";
import sliderCaptcha from '@slider-captcha/core';

export default (app: ElysiaApp) =>
    app
        .state('captcha', new Map())
        .get('/captcha/create', async ({ store }) => {
            const { data, solution } = await sliderCaptcha.create();

            const captchaId = crypto.randomUUID();
            store.captcha.set(captchaId, solution);

            return {
                status: 200,
                data: {
                    ...data,
                    captchaId,
                },
            };
        })
        .post('/captcha/verify', async ({ body, store }) => {
            const { captchaId, ...captchaInput } = body;
            const solution = store.captcha.get(captchaId);

            if (!solution) {
                return {
                    status: 400,
                    result: 'error',
                    message: 'Invalid or expired captcha ID',
                };
            }

            const verification = await sliderCaptcha.verify(solution, captchaInput);

            if (verification.result === 'success') {
                store.captcha.delete(captchaId);
            }

            return {
                status: 200,
                ...verification,
            };
        });
