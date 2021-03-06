// erro
import { MissingParamError, InvalidParamError, Unauthorized, ServerError } from '../../errors'

// protocols
import { HttpRequest, HttpResponse, Controller, EmailValidator, AddAccount } from './signupProtocols'
import { badRequest, serverError, unauthorized, ok } from '../../helpers/http-helper'

export class SingupController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, email, password, passwordConfirmation } = httpRequest.body
      const requiredFields = ['name', 'email']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError('Email or Name'))
        }
      }
      if (password !== passwordConfirmation) {
        return unauthorized(new Unauthorized('password'))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      const account = await this.addAccount.add({
        name,
        email,
        password
      })
      return ok(account)
    } catch (error) {
      console.error(error.message)
      return serverError(new ServerError())
    }
  }
}
