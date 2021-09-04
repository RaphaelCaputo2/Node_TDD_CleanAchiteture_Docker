import { MissingParamError } from '../errors/missing-param-error'
import { HttpRequest, HttpResponse } from '../protocols/http'
export class SingupController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name || !httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamError('Email or name')
      }
    }
    if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) {
      return {
        statusCode: 404,
        body: new MissingParamError('password')
      }
    }
  }
}
