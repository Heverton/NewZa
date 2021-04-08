import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Leitura } from '../../leitura/leitura';
import { Observable } from 'rxjs';

@Injectable()
export class LeituraService extends GenericService<Leitura> {

    constructor(http: HttpClient){
        super(http);
        super.base = 'leitura';
    }

    public buscarIdMedidor(id: number): Observable<Leitura[]> {
        return this.http.get<Leitura[]>(`${this.api}/${this.base}/medidor/${id}`, {headers: this.header});
    }

    public buscarUltimaLeitura(id: number): Observable<Leitura> {
        return this.http.get<Leitura>(`${this.api}/${this.base}/ultimaleitura/${id}`, {headers: this.header});
    }
}
