import { MissingParamError } from '../errors/missing-param-error'
import { InvalidParamError } from '../errors/invalidParamError'
import { Unauthorized } from '../errors/unauthorized'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { badRequest, serverError, unauthorized } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/email-validator'
import { ServerError } from '../errors/serverError'

export class SingupController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const { email, password, passwordConfirmation } = httpRequest.body
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
    } catch (error) {
      return serverError(new ServerError())
    }
  }
}
