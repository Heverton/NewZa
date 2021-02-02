import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';
import { UsuarioLogado } from './usuario-logado';

@Injectable()
export class RoleGuardService implements CanActivate {

    constructor(public auth: AuthService, public router: Router) {}

    canActivate(route: ActivatedRouteSnapshot): boolean {    // this will be passed from the route config
        // on the data property
        const expectedRole: Array<String> = route.data.expectedRole;
        const tokenPayload: Array<String> = decode(UsuarioLogado.getToken());

        console.log(String(tokenPayload['sub']));
        console.log(expectedRole);

        if ( !this.auth.isAuthenticated() || expectedRole.includes(tokenPayload['sub']) ) {
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }
}