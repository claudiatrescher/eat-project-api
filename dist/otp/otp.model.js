"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpModel = void 0;
const mongoose_1 = require("mongoose");
const otpSchema = new mongoose_1.default.Schema({
    phone: { type: String, required: true },
    email: { type: String, required: true },
    otp: { type: String, required: true },
    secret: { type: String, required: true },
});
exports.OtpModel = mongoose_1.default.model('Otp', otpSchema);
