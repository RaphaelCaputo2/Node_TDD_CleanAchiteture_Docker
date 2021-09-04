import { MissingParamError } from '../errors/missing-param-error'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { badRequest, unauthorized } from '../helpers/http-helper'
export class SingupController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name || !httpRequest.body.email) {
      return badRequest(new MissingParamError('Email or name'))
    }
    if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) {
      return unauthorized(new MissingParamError('password'))
    }
  }
}
