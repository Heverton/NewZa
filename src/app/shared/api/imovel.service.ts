import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Imovel } from 'src/app/imovel/imovel';

@Injectable()
export class ImovelService extends GenericService<Imovel> {

    constructor(http: HttpClient){
        super(http, 'imovel');
    }
}
