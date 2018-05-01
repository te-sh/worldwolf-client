import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenService } from './token.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = `Token ${this.tokenService.get()}`;
    request = request.clone({ setHeaders: { Authorization: token } });
    return next.handle(request);
  }

}
