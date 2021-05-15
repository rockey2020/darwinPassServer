import {v4 as uuidv4} from 'uuid';

const captchaMap = new Map()

//每十分钟清空所有验证码
setInterval(async () => {
    captchaMap.clear()
}, 10 * 60 * 1000)

export default class CaptchaQueueController {
    static async generateCaptchaCode(): Promise<string> {
        const captchaId = uuidv4();
        const captchaCode = uuidv4();
        console.log("captchaCode:", captchaCode)
        captchaMap.set(captchaId, captchaCode)
        return captchaId
    }

    static async validateCaptchaCode(captchaId: string, captchaCode: string): Promise<boolean> {
        const getCaptchaCode = captchaMap.get(captchaId)
        const isPass = (getCaptchaCode && getCaptchaCode === captchaCode)
        if (isPass) captchaMap.delete(captchaId)
        return isPass
    }
}
