import {v4 as uuidv4} from 'uuid';

const captchaMap = new Map()
captchaMap.set("8333ec8e-6c07-4219-8a70-8dee56f8c6a4","702dbe66-f238-4f83-a098-f328bc7db38d")
console.log(1)

//每十分钟清空所有验证码
setInterval(async () => {
    captchaMap.clear()
}, 10 * 60 * 1000)

export default class CaptchaQueueController {
    static async generateCaptchaCode(): Promise<string> {
        const captchaId = uuidv4();
        const captchaCode = uuidv4();
        console.log(captchaCode)
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
