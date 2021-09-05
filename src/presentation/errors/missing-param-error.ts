export class MissingParamError extends Error {
  constructor (paramName: string) {
    super(`Missing param: ${paramName}`)
    this.name = 'MissingParamError'
  }
}
export class Unauthorized extends Error {
  constructor (paramName: string) {
    super(`${paramName} invalid, please check this`)
    this.name = 'MissingParamError'
  }
}
