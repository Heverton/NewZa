import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuItem } from './menuitem';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  menusitens = new Array<MenuItem>();

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {

    this.menusitens.push(new MenuItem('login', 'Login', 'sis/abas/login', ''));
    this.menusitens.push(new MenuItem('avisos', 'Mural de Avisos', 'sis/abas/avisos', ''));
    this.menusitens.push(new MenuItem('imovel', 'Manter imóveis', 'sis/abas/imovel', ''));
    this.menusitens.push(new MenuItem('inquilino', 'Manter inquilino', 'sis/abas/inquilino', ''));

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

}
