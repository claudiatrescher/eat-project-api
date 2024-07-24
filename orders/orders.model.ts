import mongoose, { Schema, SchemaType } from "mongoose";
import { Restaurant1 } from "../restaurants/restaurants.model";


export interface Order extends mongoose.Document{
    _id: mongoose.Schema.Types.ObjectId,
    id?: string,
    address: string,
    number: number,
    optionalAddress: string,
    paymentOptions: PaymentOptions[]
   
    
}

export interface PaymentOptions extends mongoose.Document{
    label: String,
    value: String
}



const paymentSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
   
})

export const PaymentOptions = mongoose.model<PaymentOptions>('PaymentOptions', paymentSchema);



const pagamentoDinheiro = new PaymentOptions({
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


const pagamentoDebito = new PaymentOptions({
    label: 'Cartão de Débito',
    value: 'DEB'
});

pagamentoDebito.save()
.then(doc => {
    console.log('salvo', doc)
}).catch(err => {
    console.error('erro', err)
})



const pagamentoRef = new PaymentOptions({
    label: 'Cartão de Refeição',
    value: 'REF'
});

pagamentoRef.save()
.then(doc => {
    console.log('salvo', doc)
}).catch(err => {
    console.error('erro', err)
    
})



        const orderSchema = new mongoose.Schema({
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
        
        })        



export const Order = mongoose.model<Order>('Order', orderSchema)