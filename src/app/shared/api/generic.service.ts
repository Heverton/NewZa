import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

/**
 * Dicas
 * https://jasonwhite.xyz/posts/2019/11/16/angular-8-creating-a-generic-crud-service/
 */
@Injectable()
export class GenericService<T> {
    private header = new HttpHeaders({ 'Content-Type': 'application/json' });
    private api = environment;

    constructor(protected http: HttpClient, protected service: string){
    }

    public inserir(dados: T): Observable<T[]> {
        const body = JSON.stringify(dados);
        return this.http.post<T[]>(`${this.api}+${this.service}`, body, {headers: this.header });
    }

    public editar(dados: T): Observable<T[]> {
        const body = JSON.stringify(dados);
        return this.http.put<T[]>(`${this.api}+${this.service}`, body, {headers: this.header });
    }

    public excluir(dados: T): Observable<T[]> {
        // TODO verificar
        const body = JSON.stringify(dados);
        return this.http.patch<T[]>(`${this.api}+${this.service}`, body, {headers: this.header });
    }

    public buscar(): Observable<T[]> {
        return this.http.get<T[]>(`${this.api}+${this.service}`, {headers: this.header });
    }
}