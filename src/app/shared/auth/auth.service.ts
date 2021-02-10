import { HttpBackend, HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Login } from 'src/app/login/login';
import { GenericService } from '../api/generic.service';
import { MensagemComponente } from '../components/mensagem.component';
import { JwtRequest } from './jwt-request';
import { UsuarioLogado } from './usuario-logado';

@Injectable()
export class AuthService extends GenericService<JwtRequest> {

    private httpClient: HttpClient;

    constructor(handler: HttpBackend, http: HttpClient, private router: Router, private mensagem: MensagemComponente){
        super(http, 'autenticacao');
        this.httpClient = new HttpClient(handler);
    }

    public isAuthenticated(): boolean {
        // Check whether the token is expired and return
        // true or false
        // const decodedToken = this.jwtHelper.decodeToken(token);
        // const expirationDate = this.jwtHelper.getTokenExpirationDate(token);
        // const isExpired = this.jwtHelper.isTokenExpired(token);
        // Criar serviço para verificar se já expirou o token

        // https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8
        console.log(UsuarioLogado.getToken() !== null);
        return UsuarioLogado.getToken() !== null; // !this.jwtHelper.isTokenExpired(token);
    }
    /**
     * Utilizar essa para fazer o primeiro login
     * https://stackoverflow.com/questions/46469349/how-to-make-an-angular-module-to-ignore-http-interceptor-added-in-a-core-module
     */
    public buscar(dados: JwtRequest): Observable<JwtRequest> {
        const body = JSON.stringify(dados);
        return this.httpClient.post<JwtRequest>(`${this.api}/${this.base}`, body, {headers: this.header});
    }

    public login(login: Login): void {
        const jwtr = new JwtRequest();
        jwtr.username = login.nome;
        jwtr.password = login.senha;
        this.buscar(jwtr).subscribe((data) => {
            console.log(data);
            UsuarioLogado.setToken(data[1]['token'])
            UsuarioLogado.setUsuarioLogado(JSON.stringify(data[0]));
            this.router.navigate(['sis/abas/aviso']);
        }, (error: HttpErrorResponse) => {
            this.clearStorage();
            this.mensagem.presentToast('Error: ' + error.status + ' ' + error.message, error);
        });
    }

    public logout(): void {
        this.clearStorage();
        this.router.navigate(['']);
    }

    private clearStorage(): void {
        UsuarioLogado.clearStorage();
    }

}
