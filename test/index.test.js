const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const { describe, it } = require('mocha')
const server = require('../index')
chai.use(chaiHttp)

describe('Server tests', () => {
  it('/files/data Download files and data formatting', (done) => {
    chai
      .request(server)
      .get('/files/data')
      .end((err, res) => {
        if (err) done(err)
        // Asserts
        expect(res.status).to.be.equal(200)
        expect(res.body.files).to.be.a('array')

        done()
      })
  })

  it('/files/data Check for errors downloading files', (done) => {
    chai
      .request(server)
      .get('/files/data')
      .end((err, res) => {
        if (err) done(err)
        // Asserts
        expect(res.status).to.be.equal(200)
        expect(res.body.filesError.length).to.be.eql(2)

        done()
      })
  })
  it('/files/list File List', (done) => {
    chai
      .request(server)
      .get('/files/list')
      .end((err, res) => {
        if (err) done(err)
        // Asserts
        expect(res.status).to.be.equal(200)
        expect(res.body.files).to.be.a('array')

        done()
      })
  })
  it('/files/data/?filename={{param}} Get file by queryparams', (done) => {
    const filename = 'test3.csv'
    chai
      .request(server)
      .get(`/files/data/?filename=${filename}`)
      .end((err, res) => {
        if (err) done(err)
        // Asserts
        expect(res.status).to.be.equal(200)
        expect(res.body.files).to.be.a('array')

        done()
      })
  })
})
