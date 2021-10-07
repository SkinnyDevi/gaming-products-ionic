import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptor
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HomePage } from '../home/home.page';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptorService implements HttpInterceptor {
  public serverChange: Subject<boolean> = new Subject<boolean>();

  constructor() {
    this.serverChange.subscribe((x) => {
      //console.log("HI " + x)
      HomePage.serverNotStarted = x;
    })
  }

  intercept(
      request: HttpRequest<any>,
      next: HttpHandler
  ): Observable<HttpEvent<any>> {
      return next.handle(request)
          .pipe(
              retry(1),
              catchError((error: HttpErrorResponse) => {
                  let errorMessage = '';
                  if (error.error instanceof ErrorEvent) {
                      // client-side error
                      errorMessage = `Error: ${error.error.message}`;
                  } else {
                      // server-side error
                      errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
                      if (error.status === 0) {
                        this.changeStatus(true);
                      }
                  }
                  return throwError(errorMessage);
              })
          )
  }

  changeStatus(stat: boolean) {
    this.serverChange.next(stat)
  }
}
