/// <reference types="cypress" />

import requests from '../support/api/requests'
import schemas from '../support/api/schemas'
import assertions from '../support/api/assertions'

context('Booking', () => {

    before(() => {
        requests.doAuth();
    });

    // REQUISIÇÕES DE SUCESSO - 2XX, 3XX
    it('Validar contrato do GET booking @contract', () => {
        requests.getBooking().then(getBookingResponse => {
            assertions.shouldHaveStatus(getBookingResponse, 200)
            assertions.validateContractOf(getBookingResponse, schemas.getBookingSchema())
            assertions.shouldHaveResponseHeaders(getBookingResponse)
            assertions.shouldDuractionBeFast(getBookingResponse)
            assertions.shouldBookingIdBePresent(getBookingResponse)
        })
    });

    it('Listar todas as reservas @functional', () => {
        requests.getAllBooking().then(getAllBookingResponse => {
            assertions.shouldHaveStatus(getAllBookingResponse, 200)
            assertions.shouldDuractionBeFast(getAllBookingResponse)
            assertions.shouldBookingIdBePresent(getAllBookingResponse)
        });
    });

    it('Listar reservas (datas) @functional', () => {
        requests.getBookingDate().then(getBookingDateResponse => {
            assertions.shouldHaveStatus(getBookingDateResponse, 200)
            assertions.shouldDuractionBeFast(getBookingDateResponse)
            assertions.shouldBookingIdBePresent(getBookingDateResponse)
            assertions.shouldHaveContentTypeAppJson(getBookingDateResponse)
        })
    });

    it('Listar reservas (nomes) @functional', () => {
        requests.getBookingName().then(getBookingNameResponse => {
            assertions.shouldHaveStatus(getBookingNameResponse, 200)
            assertions.shouldDuractionBeFast(getBookingNameResponse)
            assertions.shouldBookingIdBePresent(getBookingNameResponse)
            assertions.shouldHaveContentTypeAppJson(getBookingNameResponse)
        })
    });
    it('Criar uma nova reserva @functional', () => {
        requests.postBooking().then(postBookingResponse => {
            assertions.shouldHaveStatus(postBookingResponse, 200)
            assertions.shouldHaveResponseHeaders(postBookingResponse)
            assertions.shouldHaveContentTypeAppJson(postBookingResponse)
            assertions.shouldDuractionBeFast(postBookingResponse)
            assertions.shouldBookingIdBePresent(postBookingResponse)

        })
    });

    it('Deletar reserva @functional', () => {
        requests.postBooking().then(postBookingResponse => {
            requests.deleteBooking(postBookingResponse).then(deleteBookingResponse => {
                assertions.shouldHaveStatus(deleteBookingResponse, 201)
                assertions.shouldDuractionBeFast(deleteBookingResponse)
                assertions.shouldBookingIdBePresent(deleteBookingResponse)
            })
        })
        
    });

    it('Autenticar usuário @functional', () => {
        requests.postAuth().then(postAuthResponse => {
            assertions.shouldHaveStatus(postAuthResponse, 200)
            assertions.validateContractOf(postAuthResponse, schemas.autenticateUserSchema())
            assertions.shouldDuractionBeFast(postAuthResponse)
            assertions.shouldBookingIdBePresent(postAuthResponse)
            assertions.shouldHaveContentTypeAppJson(postAuthResponse)
        })
    });

    it('Atualizar reserva @functional', () => {
        requests.postBooking().then(postBookingResponse => {
            requests.updateBooking(postBookingResponse).then(updateBookingResponse => {
                assertions.shouldHaveStatus(updateBookingResponse, 200)
                assertions.shouldDuractionBeFast(updateBookingResponse)
                assertions.shouldBookingIdBePresent(updateBookingResponse)
            })

        })
    });

    // REQUISIÇÕES DE FALHA - 4XX
    it('Criar e atualizar reserva sem token @functional', () => {
        requests.postBooking().then(postBookingResponse => {
            requests.updateBookindWithoutToken(postBookingResponse).then(updateBookindWithoutToken => {
                assertions.shouldHaveStatus(updateBookindWithoutToken, 403)
                assertions.shouldDuractionBeFast(updateBookindWithoutToken)
                assertions.shouldBookingIdBePresent(updateBookindWithoutToken)
            })
        })
    });



});