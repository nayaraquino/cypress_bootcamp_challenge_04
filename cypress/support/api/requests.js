class Requests {
    // BEFORE AUTH
    doAuth() {
        this.postAuth().then(AuthResponse => {
            const token = AuthResponse.body.token;

            Cypress.env('token', token)
        })
    }

    // AUTH
    postAuth() {
        return cy.request({
            method: 'POST',
            url: 'auth',
            body: {
                username: 'admin',
                password: 'password123'
            }
        })
    }

    // SUCCESS REQUESTS - 2XX, 3XX
    getBooking() {
        return cy.request({
            method: 'GET',
            url: 'booking/1'
        })
    }

    getAllBooking() {
        return cy.request({
            method: 'GET',
            url: 'booking'
        })
    }

    getBookingDate() {
        return cy.request({
            method: 'GET',
            url: 'booking',
            query: {
                checkin: '2018-01-01'
            }
        })
    }

    getBookingName() {
        return cy.request({
            method: 'GET',
            url: 'booking',
            query: {
                firstname: 'Ronaldo'
            }
        })
    }

    postBooking() {
        return cy.request({
            method: 'POST',
            url: 'booking',
            body: {
                "firstname": "Jim",
                "lastname": "Brown",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2020-01-01",
                    "checkout": "2020-01-02"
                },
                "additionalneeds": "Breakfast"
            }
        })
    }

    updateBooking(response) {
        const id = response.body.bookingid

        return cy.request({
            method: 'PUT',
            url: 'booking/' + id,
            headers: {
                Cookie: 'token=' + Cypress.env('token')
            },
            body: {
                "firstname": "Jim",
                "lastname": "Brown",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2020-01-01",
                    "checkout": "2020-01-02"
                },
                "additionalneeds": "Breakfast"
            },
            failOnStatusCode: false
        })
    }

    deleteBooking(response) {
        const id = response.body.bookingid

        return cy.request({
            method: 'DELETE',
            url: 'booking/' + id,
            headers: {
                Cookie: 'token=' + Cypress.env('token')
            },
            failOnStatusCode: false
        })
    }




    // ERROR REQUESTS - 4XX, 5XX
    updateBookingdWithoutToken(response) {
        const id = response.body.bookingid

        return cy.request({
            method: 'PUT',
            url: 'booking/' + id,
            body: {
                "firstname": "Jim",
                "lastname": "Brown",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2020-01-01",
                    "checkout": "2020-01-02"
                },
                "additionalneeds": "Breakfast"
            },
            failOnStatusCode: false
        })
    }


    updateInexistentBooking(response) {
        const id = response.body.bookingid

        return cy.request({
            method: 'DELETE',
            url: 'booking/1' + id,
            headers: {
                Cookie: 'token=' + Cypress.env('token')
            },
            body: {
                "firstname": "Jim",
                "lastname": "Brown",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2020-01-01",
                    "checkout": "2020-01-02"
                },
                "additionalneeds": "Breakfast"
            },
            failOnStatusCode: false
        })
    }

    updateBookingWithInvalidToken(response) {
        const id = response.body.bookingid
        
        return cy.request({
            method: 'PUT',
            url: 'booking/' + id,
            headers: {
                Cookie: 'token=1234'
            },
            body: {
                "firstname": "Jim",
                "lastname": "Brown",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2020-01-01",
                    "checkout": "2020-01-02"
                },
                "additionalneeds": "Breakfast"
            },
            failOnStatusCode: false
        })
    }

    deleteInexistentBooking(response) {
        const id = response.body.bookingid

        return cy.request({
            method: 'DELETE',
            url: 'booking/1' + id,
            headers: {
                Cookie: 'token=' + Cypress.env('token')
            },
            failOnStatusCode: false
        })
    }

    deleteBookingWithoutToken(response) {
        const id = response.body.bookingid

        return cy.request({
            method: 'DELETE',
            url: 'booking/' + id,
            failOnStatusCode: false
        })
    }

    deleteBookingWithWrongToken(response) {
        const id = response.body.bookingid

        return cy.request({
            method: 'DELETE',
            url: 'booking/' + id,
            headers: {
                Cookie: 'token=1234'
            },
            failOnStatusCode: false
        })
    }
}

export default new Requests();