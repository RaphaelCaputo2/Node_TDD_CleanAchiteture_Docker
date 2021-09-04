import { HttpResponse } from '../protocols/http'
export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}
export const unauthorized = (error: Error): HttpResponse => {
  return {
    statusCode: 404,
    body: error
  }
}
