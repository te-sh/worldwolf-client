import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    request = request.clone({ withCredentials: true });
    return next.handle(request);
  }

}
