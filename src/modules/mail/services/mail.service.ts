import { Injectable } from '@nestjs/common';
import { transporter } from '../config/config.transporter';

@Injectable()
export class MailService {
  async sendVerificationEmail(to: string, userName: string) {
    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject: 'New User Registration',
      text: `A new user has registered: ${userName}. Please verify the user.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }

  async sendAccountVerifiedEmail(to: string) {
    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject: 'Account Verified',
      text: 'Your account has been verified. You can now create, update, and delete ads.',
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Verification email sent: ' + info.response);
      }
    });
  }
}
