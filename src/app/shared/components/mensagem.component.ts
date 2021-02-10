import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Injectable()
export class MensagemComponente {
    private debugger: boolean = !environment.production;

    constructor(private toastController: ToastController){}

    async presentToast(mensagem: string, error?: HttpErrorResponse) {
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

        if (this.debugger) {
          console.log('Erro: ', error);
        }
    }

    async presentToastSucess(mensagem: string, result?: any) {
      const toast = await this.toastController.create({
        message: mensagem,
        duration: 2000,
        buttons: [{
            text: 'Close',
            role: 'cancel',
            handler: () => {}
          }]
      });
      toast.present();

      if (this.debugger) {
        console.log('Sucesso: ', result);
      }
  }
}