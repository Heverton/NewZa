import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Aviso } from 'src/app/avisos/aviso';
import { GenericService } from './generic.service';

@Injectable()
export class AvisosService extends GenericService<Aviso> {

    constructor(protected http: HttpClient){
        super(http, 'avisos');
    }
}
