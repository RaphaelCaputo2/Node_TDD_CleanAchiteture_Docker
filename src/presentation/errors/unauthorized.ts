export class Unauthorized extends Error {
  constructor (paramName: string) {
    super(`${paramName} invalid, please check this`)
    this.name = 'MissingParamError'
  }
}
