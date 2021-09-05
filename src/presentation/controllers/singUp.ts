import { MissingParamError, Unauthorized } from '../errors/missing-param-error'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { badRequest, unauthorized } from '../helpers/http-helper'
export class SingupController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError('Email or Name'))
      }
    }
    if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) {
      return unauthorized(new Unauthorized('password'))
    }
  }
}
