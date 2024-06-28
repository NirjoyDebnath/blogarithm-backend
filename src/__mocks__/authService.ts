export const mockAuthService = jest.mock('./../services', () => {
  return {
    __esModule: true,
    logIn: 'Demo token',
    default: jest.fn()
  };
});
