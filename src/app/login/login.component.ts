import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../shared/auth/auth.service';
import { Login } from './login';
import { RegistroModalComponent } from './modal/registro.modal.component';
// import { Auth, UserDetails, User } from "@ionic/cloud-angular";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {

  estaAutenticado: boolean;
  email: string;
  senha: string;

  userData: any = {};

  // https://medium.com/@edigleyssonsilva/adding-google-sign-in-to-your-ionic-3-4-5-app-8ed81744e8ba
  constructor(private router: Router, 
              private auth: AuthService, 
              private googlePlus: GooglePlus,
              private md: ModalController){
    this.email = 'springuser';
    this.senha = 'password';
  }

  login(): void{
    const login = new Login();
    login.nome = this.email;
    login.senha = this.senha;

    // TODO Trazer o router.navigate(['sis/abas/aviso']); para cá
    this.auth.login(login);
    // if (this.auth.login(login)) {
    //   this.router.navigate(['sis/abas/aviso']);
    // } else {
    //   this.router.navigate(['/']);
    //   console.log('Problemas no login!');
    // }
  }

  googleSignIn() {
    this.googlePlus.login({}).then(result => {
        this.userData = result;
        this.estaAutenticado = true;
    }).catch(err => this.userData = `Error ${JSON.stringify(err)}`);
  }

  logout(): void{
    // this.auth.logout();
  }

  // cadastrar(): void{
  //   //   let dados: UserDetails = {
  //   //     'email': this.email,
  //   //     'password': this.senha
  //   //  };
  //   //   this.auth.signup(dados).then(() => {
  //   //     // USUÁRIO CRIADO - PODE SER ACESSADO COM this.user
  //   //     console.log(this.user);
  //   //   }, erro => {
  //   //     // TRATAR O ERRO
  //   //     console.log("Erro no cadastro");
  //   //   });
  // }
  async cadastrar(itemmodal?: Login): Promise<void> {
    itemmodal = (itemmodal == null)? new Login() : itemmodal;
    const modal = await this.md.create({
      component: RegistroModalComponent,
      cssClass: 'modal-class',
      componentProps: {item: itemmodal}
    });
    // init modal
    await modal.present();
    // Retorno no close
    const dadosCloseModal = await modal.onDidDismiss();
    if (dadosCloseModal) {
      // this.ngOnInit();
    }
  }

}
