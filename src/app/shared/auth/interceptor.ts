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
import { UsuarioLogado } from './usuario-logado';
import { ToastController } from '@ionic/angular';
import { MensagemComponente } from '../components/mensagem.component';

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private auth: AuthService, private mensagem: MensagemComponente) {}

    // TODO https://itnext.io/handle-http-responses-with-httpinterceptor-and-toastr-in-angular-3e056759cb16
    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${UsuarioLogado.getToken()}`)
        });

        return next.handle(request).pipe(
            tap(evt => { }),
            catchError((err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 400) {
                        this.mensagem.presentToast(err.status + ' ' + err.error[0] + ' ' + err?.error[1], err);
                    }
                    if (err.status === 403) {
                        this.mensagem.presentToast(err.status + ' ' + err.error[0] + ' ' + err?.error[1], err);
                    }
                    if (err.status === 500) {
                        this.mensagem.presentToast(err.status + ' ' + err.error[0] + ' ' + err?.error[1], err);
                    }
                }
                // this.mensagem.presentToast('Erro indefinido:' + err.message, err);
                return of(err);
            })
        );
    }
}
