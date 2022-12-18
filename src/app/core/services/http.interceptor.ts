import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token");
    if (token) {
      request = request.clone({
        headers: request.headers
          .set("authorization", "Bearer " + token)
          .set('Accept', 'application/json')
          .set('Access-Control-Allow-Headers', '*')
      });
    } else {
      request = request.clone({
        headers: request.headers
          .set('Accept', 'application/json')
          .set('Access-Control-Allow-Headers', '*')
      })
    }
    return next.handle(request);
  }
}



