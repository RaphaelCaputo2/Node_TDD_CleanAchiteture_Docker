export class ServerError extends Error {
  constructor () {
    super('Internal Server Error: 500')
    this.name = 'ServerError'
  }
}
