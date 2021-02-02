import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuItem } from './menuitem';
import { AuthService } from './shared/auth/auth.service';

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
    private statusBar: StatusBar,
    private authService: AuthService
  ) {

    this.menusitens.push(new MenuItem('login', 'Login', 'sis/abas/login', ''));
    this.menusitens.push(new MenuItem('aviso', 'Mural de Aviso', 'sis/abas/aviso', ''));
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

  realizarLogout(){
    this.authService.logout();
  }

}
