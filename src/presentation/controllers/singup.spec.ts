import { MissingParamError } from '../errors/missing-param-error'
import { SingupController } from './singUp'
describe('SingUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const sut = new SingupController()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('Email or Name'))
  })
  test('Should return 400 if no email is provided', () => {
    const sut = new SingupController()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('Email or Name'))
  })
  test('Should return 404 if password is not equal', () => {
    const sut = new SingupController()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'anypassword'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(404)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })
})
