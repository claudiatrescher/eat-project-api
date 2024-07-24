import * as nodemailer from 'nodemailer'
import { User } from '../users/users.model';

import { enviroment } from '../common/enviroment';




class Mail{

    constructor(
                public to?: User["email"],
                public subject?: string,
                public message?: string
    ){}


    sendMail(){
        let mailOptions = {
            from: enviroment.user.user,
            to: this.to,
            subject: this.subject,
            html: this.message
        }

        const transporter = nodemailer.createTransport({
            service: "Hotmail",
            auth: {
                user: enviroment.user.user,
                pass: enviroment.user.password
            },
            tls: {rejectUnauthorized: false}
        });

        console.log(mailOptions)


        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return error
            }else{
                return "Email enviado com sucesso!"
            }
        })

    }

    
}

export default new Mail;