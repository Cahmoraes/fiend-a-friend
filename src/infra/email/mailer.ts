import { OrgCreated } from '@/domain/enterprise/events/orgs/org-created'
import nodemailer from 'nodemailer'

export class Mailer {
  private static nodemailer = nodemailer

  private static async createTransport() {
    const testAccount = await this.createTestAccount()
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    })
  }

  private static async createTestAccount() {
    return this.nodemailer.createTestAccount()
  }

  static async sendMail(data: OrgCreated) {
    const transporter = await this.createTransport()
    const info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: 'bar@example.com, baz@example.com', // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: `<b>Hello world?</b><p>OrgId: ${data.orgId.value}</p>`, // html body
    })

    console.log('Message sent: %s', info.messageId)
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', this.nodemailer.getTestMessageUrl(info))
  }
}
