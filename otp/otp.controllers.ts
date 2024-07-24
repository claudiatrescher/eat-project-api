import { Response, Request } from 'supertest';
import * as restify from 'restify'

import {Otp, OtpModel} from './otp.model'
import {generate} from 'otp-generator'

export class OtpController{
    public async generateOtp(req: restify.Request, res: restify.Response){
        const {phone, email} =  req.body;

        const otp = generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false
        })

        const secret = generate(20, {
            digits: true,
            lowerCaseAlphabets: true,
            upperCaseAlphabets: true,
            specialChars: true
        })

        const newOtp: Partial<Otp> = {
            phone,
            email,
            otp,
            secret
        }

        try{
            const criarOtp = await OtpModel.create(newOtp)
            res.json({ otp: criarOtp.otp})
        } catch(error){
            console.log(error)
            res.status(500)
        }}

        public async verifyOtp(req: restify.Request, res: restify.Response) {
        const { phone, email, otp } = req.body;

        try {
        const foundOtp = await OtpModel.findOne({ phone, email, otp });
        if (foundOtp) {
            Response.json({ message: 'OTP verified successfully' });
        } else {
            res.status(401);
        }
        } catch (error) {
        console.error(error);
        res.status(500);
        }
    }
}