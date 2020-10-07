import { Injectable } from '@angular/core';
// import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

    // constructor(public jwtHelper: JwtHelperService) {}  // ...

    public isAuthenticated(): boolean {
        const token = localStorage.getItem('access_token');
        // Check whether the token is expired and return
        // true or false
        // const decodedToken = this.jwtHelper.decodeToken(token);
        // const expirationDate = this.jwtHelper.getTokenExpirationDate(token);
        // const isExpired = this.jwtHelper.isTokenExpired(token);

        return true; // !this.jwtHelper.isTokenExpired(token);
    }

    public login(login: string, senha: string){
        localStorage.setItem('access_token', 'tessjdhfjhsdjf');
    }
}
