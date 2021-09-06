// erro
import { MissingParamError, InvalidParamError, Unauthorized, ServerError } from '../errors/'

// protocols
import { HttpRequest, HttpResponse, Controller, EmailValidator } from '../protocols/'
import { badRequest, serverError, unauthorized } from '../helpers/http-helper'
import { AddAccount } from '../../domain/useCases/add-account'

export class SingupController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handle (httpRequest: HttpRequest): HttpResponse {
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
      this.addAccount.add({
        name,
        email,
        password
      })
    } catch (error) {
      return serverError(new ServerError())
    }
  }
}
