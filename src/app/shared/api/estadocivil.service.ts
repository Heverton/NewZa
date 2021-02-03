import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { EstadoCivil } from 'src/app/inquilino/estadocivil';

@Injectable()
export class EstadoCivilService extends GenericService<EstadoCivil> {

    constructor(http: HttpClient){
        super(http, 'estadocivil');
    }
}
