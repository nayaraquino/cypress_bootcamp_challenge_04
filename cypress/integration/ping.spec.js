/// <reference types="cypress" />

import requests from '../support/api/requests'
import assertions from '../support/api/assertions'

context('Ping @healthcheck', () => {
    it('Verificar se a aplicação está no ar @healthcheck', () => {
        requests.getBooking().then(getBookingResponse => {
            assertions.shouldHaveStatus(getBookingResponse, 200)
            assertions.shouldHaveResponseHeaders(getBookingResponse)
            assertions.shouldDuractionBeFast(getBookingResponse)
            assertions.shouldBookingIdBePresent(getBookingResponse)
        })
    });
});