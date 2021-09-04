import { SingupController } from './singUp';
describe('SingUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const sut = new SingupController();
    const httpRequest = {
      body: {
        // name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
});
