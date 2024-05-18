import nodemailer from 'nodemailer';
import sendgridTransport from 'nodemailer-sendgrid-transport';

export const generateOTP = (otp_length = 6) => {
  let OTP = '';
  for (let i = 1; i <= otp_length; i++) {
    const randomVal = Math.round(Math.random() * 9);
    OTP += randomVal;
  }

  return OTP;
};

// Production
export const generateMailTransport = () => {
  // SendGrid
  if (process.env.NODE_ENV === 'production') {
    return nodemailer.createTransport(
      sendgridTransport({
        auth: {
          api_key: process.env.SENDGRID_KEY,
        },
      })
    );
  }

  // Mailtrap
  return nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.MAIL_TRAP_USER,
      pass: process.env.MAIL_TRAP_PASS,
    },
  });
};
