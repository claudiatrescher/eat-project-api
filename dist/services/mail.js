"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
const enviroment_1 = require("../common/enviroment");
class Mail {
    constructor(to, subject, message) {
        this.to = to;
        this.subject = subject;
        this.message = message;
    }
    sendMail() {
        let mailOptions = {
            from: enviroment_1.enviroment.user.user,
            to: this.to,
            subject: this.subject,
            html: this.message
        };
        const transporter = nodemailer.createTransport({
            service: "Hotmail",
            auth: {
                user: enviroment_1.enviroment.user.user,
                pass: enviroment_1.enviroment.user.password
            },
            tls: { rejectUnauthorized: false }
        });
        console.log(mailOptions);
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return error;
            }
            else {
                return "Email enviado com sucesso!";
            }
        });
    }
}
exports.default = new Mail;
