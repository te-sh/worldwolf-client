export class TokenService {
  get() {
    return sessionStorage.getItem('token');
  }

  set(token: string) {
    sessionStorage.setItem('token', token);
  }

  reset() {
    sessionStorage.removeItem('token');
  }
}
