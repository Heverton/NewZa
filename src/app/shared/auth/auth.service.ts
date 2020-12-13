import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Login } from 'src/app/login/login';
import { GenericService } from '../api/generic.service';
import { JwtRequest } from './jwt-request';

@Injectable()
export class AuthService extends GenericService<JwtRequest> {

    private httpClient: HttpClient;

    constructor(handler: HttpBackend, protected http: HttpClient, protected service: string, private router: Router){
        super(http, 'autenticacao');
        this.httpClient = new HttpClient(handler);
        // Login OK
        // localStorage.setItem('token');
    }

    public isAuthenticated(): boolean {
        // Check whether the token is expired and return
        // true or false
        // const decodedToken = this.jwtHelper.decodeToken(token);
        // const expirationDate = this.jwtHelper.getTokenExpirationDate(token);
        // const isExpired = this.jwtHelper.isTokenExpired(token);
        // Criar serviço para verificar se já expirou o token

        // https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8
        return (this.getToken() !== null); // !this.jwtHelper.isTokenExpired(token);
    }

    public getToken(): string{
        return localStorage.getItem('access_token');
    }

    public login(login: Login): void {
        const jwtr = new JwtRequest();
        jwtr.username = login.nome;
        jwtr.password = login.senha;
        console.log(jwtr);
        this.buscar(jwtr).subscribe((data) => {
            console.log(data);
            localStorage.setItem('access_token', data['token']);
            this.router.navigate(['sis/abas/aviso']);
        }, (erro) => {
            localStorage.setItem('access_token', '');
            console.log(erro);
        });
    }

    /**
     * Utilizar essa para fazer o primeiro login
     * https://stackoverflow.com/questions/46469349/how-to-make-an-angular-module-to-ignore-http-interceptor-added-in-a-core-module
     * 
     * @param dados 
     */
    public buscar(dados: JwtRequest): Observable<JwtRequest> {
        const body = JSON.stringify(dados);
        return this.httpClient.post<JwtRequest>(`${this.api}/${this.base}`, body, {headers: this.header});
    }


}
