import {Injectable} from '@nestjs/common';
import CaptchaQueueController from "./CaptchaQueueController";

@Injectable()
export class CaptchaService {
    async getCaptchaCode() {
        return {captchaId: await CaptchaQueueController.generateCaptchaCode()}
    }

    async validateCaptchaCode(captchaId: string, captchaCode: string) {
        return CaptchaQueueController.validateCaptchaCode(captchaId, captchaCode)
    }
}
