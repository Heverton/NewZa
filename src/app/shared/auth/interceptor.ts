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
import { UsuarioLogado } from './usuario-logado';
import { ToastController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar';

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private auth: AuthService, private toastController: ToastController) {}

    // TODO https://itnext.io/handle-http-responses-with-httpinterceptor-and-toastr-in-angular-3e056759cb16
    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${UsuarioLogado.getToken()}`)
        });

        return next.handle(request).pipe(
            tap(evt => {
                // console.log('Sucesso', evt);
            }), catchError((err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 403) {
                        this.presentToast(err.status + ' ' + err.error[0] + ' ' + err?.error[1])
                    }
                }
                console.log('Erro geral', err);
                return of(err);
            })
        );
    }

    async presentToast(mensagem: string) {
        const toast = await this.toastController.create({
          message: mensagem,
          duration: 2000,
          buttons: [
            {
              text: 'Close',
              role: 'cancel',
              handler: () => {}
            }
          ]
        });
        toast.present();
    }
}
