import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Energia } from 'src/app/energia/energia';

@Injectable()
export class EnergiaService extends GenericService<Energia> {

    constructor(protected http: HttpClient, protected service: string){
        super(http, 'energia');
    }
}