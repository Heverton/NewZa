import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Login } from '../../login/login';

@Injectable()
export class LoginService extends GenericService<Login> {

    constructor(http: HttpClient){
        super(http);
        super.base = 'login';
    }
}
