import User from '@/models/user.model';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

export const sendEmail=async({email,emailType,userId}:any)=>
{
    try{
        const hashedToken=await bcryptjs.hash(userId.toString(),10);
        if(emailType==='VERIFY')
        {
            await User.findByIdAndUpdate(userId,{
                verifyToken:hashedToken,
                verifyTokenExpiry:Date.now()+3600000
            });
        }
        else if(emailType==='RESET')
            {
                await User.findByIdAndUpdate(userId,{
                    forgotPasswordToken:hashedToken,
                    forgotPasswordTokenExpiry:Date.now()+3600000
                }
                );
            }

       var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS,
            }
            });
            
        const mailOptions={
            from: 'cherrysmrh@gmail.com', // sender address
            to:email, //  receiver
            subject: emailType==='VERIFY' ? 'Verify your Email' : 'Reset your Password', // Subject line
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyEmail?token=${hashedToken}">here</a> to ${emailType==='VERIFY' ? 'verify your email' : 'Reset your password'}</p>`
        }

        const mailResponse=await transport.sendMail(mailOptions);
        return mailResponse;
     }catch(error:any)
        {
                throw new Error(error.message);
        }
}