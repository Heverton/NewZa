import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

/**
 * Dicas
 * https://jasonwhite.xyz/posts/2019/11/16/angular-8-creating-a-generic-crud-service/
 */
@Injectable()
export abstract class GenericService<T> {
    private _header = new HttpHeaders({ 'Content-Type': 'application/json' });
    private _api = environment.endpoints.api;

    constructor(protected _http: HttpClient, protected _base: string){ }

    public inserir(dados: T): Observable<T[]> {
        const body = JSON.stringify(dados);
        return this._http.post<T[]>(`${this._api}/${this._base}`, body, {headers: this._header });
    }

    public editar(dados: T): Observable<T[]> {
        const body = JSON.stringify(dados);
        return this._http.put<T[]>(`${this._api}/${this._base}`, body, {headers: this._header });
    }

    public excluir(dados: T): Observable<T[]> {
        // TODO verificar
        const body = JSON.stringify(dados);
        return this._http.patch<T[]>(`${this._api}/${this._base}`, body, {headers: this._header });
    }

    public buscar(): Observable<T[]> {
        return this._http.get<T[]>(`${this._api}/${this._base}`, {headers: this._header });
    }
}