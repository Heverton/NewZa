import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Aviso } from '../../aviso/aviso';
import { GenericService } from './generic.service';

@Injectable()
export class AvisoService extends GenericService<Aviso> {

    constructor(http: HttpClient){
        super(http);
        super.base = 'aviso';
    }
}
