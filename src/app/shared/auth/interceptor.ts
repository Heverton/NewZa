import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private auth: AuthService, private localNotifications: LocalNotifications) {}

    // TODO https://itnext.io/handle-http-responses-with-httpinterceptor-and-toastr-in-angular-3e056759cb16
    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${this.auth.getToken()}`)
        });

        return next.handle(request).pipe(
            tap(evt => {
                // console.log('Sucesso', evt);
            }), catchError((err: any) => {
                if (err instanceof HttpErrorResponse) {
                    console.log('HttpErrorResponse', err.status + ' ' + err.message);
                    // this.localNotifications.schedule({
                    //     id: 0,
                    //     title: err.status + ' ' + err.message,
                    //     text: err.error
                    // });
                }
                console.log('Erro', err);
                return of(err);
            })
        );
    }
}
