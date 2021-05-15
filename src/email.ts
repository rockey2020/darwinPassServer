import * as sendmail from "sendmail"

const sendMailer = sendmail()

class Email {
    static async sendEmail(email: string, content: string, subject?: string) {
        const options = {
            from: 'darwinPass@pornhub.com',
            to: email,
            subject,
            html: `${content}`,
        }
        sendMailer(options);
    }
}

export default Email
