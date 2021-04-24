class Assertions {
    shouldHaveStatus(response, status) {
        expect(response.status, 'status is ' + status).to.eq(status)
    }

    validateContractOf(response, schema) {
        return cy.wrap(response.body).should(
            schema
        )
    }

    shouldBookingIdBePresent(response) {
        expect(response.body.bookingid, 'bookingis exists').to.not.be.null;
    }

    shouldHaveResponseHeaders(response) {
        expect(response.headers, 'default headers').to.include({
            server: 'Cowboy',
            connection: 'keep-alive',
            'x-powered-by': 'Express'
        })
    }

    shouldHaveContentTypeAppJson(response) {
        expect(response.headers, 'content type').to.include({
            'content-type': 'application/json; charset=utf-8'
        })
    }

    shouldDuractionBeFast(response) {
        expect(response.duration, 'response duraction').lt(600)
    }
}

export default new Assertions();