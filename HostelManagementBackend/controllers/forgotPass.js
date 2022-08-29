import Client from "../models/client.model.js"
import bcrypt from "bcrypt";
import nodemailer, { createTransport } from "nodemailer"
import JSONTransport from "nodemailer/lib/json-transport/index.js";


const ourOTP = 8394;
    
export const verifyOTP = (req,res) => {
    const { username, otp } = req.body;

    try {
        //[Verify User] 
        // If User Exists
        const client = Client.findOne({username:username})
        
        if(client)
                {
            if(ourOTP === Number(otp))
                res.status(200).json({verified:true});
            else
                res.status(400).json({verified:false});
        }
    } catch (error) {
        console.log(err)
    }
} 

export async function generateOTP(req,res){
    try{
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'testmailhk@gmail.com',
            pass: 'Hk@08052003'
          }
        });

        var mailOptions = {
          from: `testmailhk@gmail.com`,
          to: `${req.body.email}`,
          subject: 'Sending Email using Node.js',
          text: `${ourOTP}`
        };

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({message:"otp sent to mail"})
          }
        });

    }
    catch(err){
        console.log("mail error: ",err)
        res.status(400).json({message:"there has been some error"})
    }
}

// //     try {
// //         //[Verify User] 
// //         // If User Exists
// //             // Create OTP
// //             // Mail it to User
// //             // Save it in Users DB
// //             // Return Hashed OsTP 
// //         // Else
// //             // Return Error
// //         // Verify OTP
// //         const { username, otp } = req.body;
// //     } catch (error) {
        
// //     }
// // }

// // // async..await is not allowed in global scope, must use a wrapper
// // async function main() {
// //   // Generate test SMTP service account from ethereal.email
// //   // Only needed if you don't have a real mail account for testing
// //   let testAccount = await nodemailer.createTestAccount();

// //   // create reusable transporter object using the default SMTP transport
// //   let transporter = nodemailer.createTransport({
// //     host: "smtp.ethereal.email",
// //     port: 587,
// //     secure: false, // true for 465, false for other ports
// //     auth: {
// //       user: testAccount.user, // generated ethereal user
// //       pass: testAccount.pass, // generated ethereal password
// //     },
// //   });

// //   // send mail with defined transport object
// //   let info = await transporter.sendMail({
// //     from: '"Fred Foo 👻" <foo@example.com>', // sender address
// //     to: "bar@example.com, baz@example.com", // list of receivers
// //     subject: "Hello ✔", // Subject line
// //     text: "Hello world?", // plain text body
// //     html: "<b>Hello world?</b>", // html body
// //   });

// //   console.log("Message sent: %s", info.messageId);
// //   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

// //   // Preview only available when sending through an Ethereal account
// //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
// //   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// // }

// // main().catch(console.error);