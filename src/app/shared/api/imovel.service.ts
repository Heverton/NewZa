import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Imovel } from 'src/app/imovel/imovel';

@Injectable()
export class ImovelService extends GenericService<Imovel> {

    constructor(protected http: HttpClient, protected service: string){
        super(http, 'imovel');
    }
}
