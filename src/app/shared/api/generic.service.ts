import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

/**
 * Dicas
 * https://jasonwhite.xyz/posts/2019/11/16/angular-8-creating-a-generic-crud-service/
 */
@Injectable()
export abstract class GenericService<T> {
    protected header = new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8'});
    protected api = environment.endpoints.api;
    protected debugger = !environment.production;
    protected params: HttpParams = new HttpParams();
    protected base: string;

    constructor(protected http: HttpClient){ }

    public inserir(dados: T): Observable<T[]> {
        const body = JSON.stringify(dados);
        return this.http.post<T[]>(`${this.api}/${this.base}`, body, {headers: this.header });
    }

    public editar(dados: T): Observable<T[]> {
        const body = JSON.stringify(dados);
        return this.http.put<T[]>(`${this.api}/${this.base}`, body, {headers: this.header });
    }

    public excluir(dados: T): Observable<T[]> {
        const body = JSON.stringify(dados);
        return this.http.patch<T[]>(`${this.api}/${this.base}`, body, {headers: this.header });
    }

    public excluirId(id: number): Observable<T[]> {
        return this.http.delete<T[]>(`${this.api}/${this.base}/${id}`, {headers: this.header });
    }

    public buscarAll(): Observable<T[]> {
        return this.http.get<T[]>(`${this.api}/${this.base}`, {headers: this.header});
    }

    public buscarId(id: number): Observable<T[]> {
        return this.http.get<T[]>(`${this.api}/${this.base}/${id}`, {headers: this.header});
    }

    public buscar(dados: T): Observable<T> {
        const body = JSON.stringify(dados);
        return this.http.post<T>(`${this.api}/${this.base}`, body, {headers: this.header});
    }
}
