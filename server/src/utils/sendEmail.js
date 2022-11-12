import nodemailer from 'nodemailer'
exports.sendEmail = async (options) =>{
    const emailOptions = {
        from:"anassain2002@gmail.com",
        to:"anassain13@gmail.com",
        subject:options.subject,
        text:options.message

    }
    const transport = nodemailer.createTransport({
        host:'smpt.gmail.com',
        port:465,
        service:'gmail',
        auth:{
            user:"anassain2002@gmail.com",
            pass:"tfpsrmumelowglxw"
        }
    })
    await transport.sendMail(emailOptions);
    }
