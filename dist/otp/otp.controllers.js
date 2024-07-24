"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpController = void 0;
const otp_model_1 = require("./otp.model");
const otp_generator_1 = require("otp-generator");
class OtpController {
    async generateOtp(req, res) {
        const { phone, email } = req.body;
        const otp = (0, otp_generator_1.generate)(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false
        });
        const secret = (0, otp_generator_1.generate)(20, {
            digits: true,
            lowerCaseAlphabets: true,
            upperCaseAlphabets: true,
            specialChars: true
        });
        const newOtp = {
            phone,
            email,
            otp,
            secret
        };
        try {
            const criarOtp = await otp_model_1.OtpModel.create(newOtp);
            res.json({ otp: criarOtp.otp });
        }
        catch (error) {
            console.log(error);
            res.status(500);
        }
    }
    async verifyOtp(req, res) {
        const { phone, email, otp } = req.body;
        try {
            const foundOtp = await otp_model_1.OtpModel.findOne({ phone, email, otp });
            if (foundOtp) {
                Response.json({ message: 'OTP verified successfully' });
            }
            else {
                res.status(401);
            }
        }
        catch (error) {
            console.error(error);
            res.status(500);
        }
    }
}
exports.OtpController = OtpController;
