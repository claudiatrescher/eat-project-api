import 'jest'

import * as request from 'supertest'


let address: string = (<any>global).address

test( ' get /orders', ( ) => {
    return request(address)
    .get('/orders')
    .then(response => {
        expect(response.status).toBe(200)
        expect(response.body.items).toBeInstanceOf(Array)
    })
    .catch(fail)
})


test(' post /orders', () => {
    return request(address)
    .post(' /orders')
})