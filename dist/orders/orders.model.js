"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.PaymentOptions = void 0;
const mongoose_1 = require("mongoose");
const paymentSchema = new mongoose_1.default.Schema({
    label: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
});
exports.PaymentOptions = mongoose_1.default.model('PaymentOptions', paymentSchema);
const pagamentoDinheiro = new exports.PaymentOptions({
    label: 'Dinheiro ',
    value: 'MON'
});
pagamentoDinheiro.save()
    .then(doc => {
    console.log('Opção de pagamento salva:', doc);
})
    .catch(err => {
    console.error('Erro ao salvar opção de pagamento:', err);
});
const pagamentoDebito = new exports.PaymentOptions({
    label: 'Cartão de Débito',
    value: 'DEB'
});
pagamentoDebito.save()
    .then(doc => {
    console.log('salvo', doc);
}).catch(err => {
    console.error('erro', err);
});
const pagamentoRef = new exports.PaymentOptions({
    label: 'Cartão de Refeição',
    value: 'REF'
});
pagamentoRef.save()
    .then(doc => {
    console.log('salvo', doc);
}).catch(err => {
    console.error('erro', err);
});
const orderSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    optionalAddress: {
        type: String,
        required: false
    },
    paymentOptions: {
        type: [paymentSchema],
        required: true,
        select: true,
        default: []
    }
});
exports.Order = mongoose_1.default.model('Order', orderSchema);
