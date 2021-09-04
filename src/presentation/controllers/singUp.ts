export class SingupController {
  handle (httpRequest: any): any {
    if (!httpRequest.body.name || !httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new Error('Missing param')
      }
    }
    if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) {
      return {
        statusCode: 404,
        body: new Error('Wrong Password')
      }
    }
  }
}
