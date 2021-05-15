import {v4 as uuidv4} from 'uuid';

const captchaMap = new Map()

//每十分钟清空所有验证码
setInterval(async () => {
    captchaMap.clear()
}, 10 * 60 * 1000)

export default class CaptchaQueueController {
    static async generateCaptchaCode(): Promise<{ captchaId, captchaCode }> {
        const captchaId = uuidv4();
        const captchaCode = uuidv4().replace(/-/g, "").slice(0, 6).toLowerCase();
        captchaMap.set(captchaId, captchaCode)
        return {captchaId, captchaCode}
    }

    static async validateCaptchaCode(captchaId: string, captchaCode: string): Promise<boolean> {
        const getCaptchaCode = captchaMap.get(captchaId)
        const isPass = (getCaptchaCode && getCaptchaCode === captchaCode.toLowerCase())
        if (isPass) captchaMap.delete(captchaId)
        return isPass
    }
}
