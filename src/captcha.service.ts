import {Injectable} from '@nestjs/common';
import CaptchaQueueController from "./CaptchaQueueController";
import Email from "./email";

@Injectable()
export class CaptchaService {
    async getCaptchaCodeByEmail(body) {
        const generateCaptchaCode = await CaptchaQueueController.generateCaptchaCode()
        const captchaId = generateCaptchaCode.captchaId
        const captchaCode = generateCaptchaCode.captchaCode
        Email.sendEmail(body.email, `<h1>Captcha Code : <span>${captchaCode}</span></h1>`, "Captcha Code")
        return {captchaId}
    }

    async validateCaptchaCode(captchaId: string, captchaCode: string) {
        return CaptchaQueueController.validateCaptchaCode(captchaId, captchaCode)
    }
}
