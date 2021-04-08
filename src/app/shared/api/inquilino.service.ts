import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inquilino } from '../../inquilino/Inquilino';
import { GenericService } from './generic.service';
import { Observable } from 'rxjs';

@Injectable()
export class InquilinoService extends GenericService<Inquilino> {

    constructor(http: HttpClient){
        super(http);
        super.base = 'inquilino';
    }

    public buscarPorCpf(dados: Inquilino): Observable<Inquilino> {
        const body = JSON.stringify(dados);
        return this.http.post<Inquilino>(`${this.api}/${this.base}/porCpf`, body, {headers: this.header});
    }

    public buscarPorParamCpf(cpf: string): Observable<Inquilino> {
        return this.http.get<Inquilino>(`${this.api}/${this.base}/porCpf/${cpf}`, {headers: this.header});
    }

//     /**
//    * Salva uma lista de documentos sigilosos
//    * @param favorito lista de documentos a serem sigilosos
//    * @param processoId
//    */
//   salvarSigiloso(sigiloso: object, processoId: number): Observable<object> {
//     const header = new HttpHeaders({ 'Content-Type': 'application/json' });
//     const body = JSON.stringify(sigiloso);

//     return this.http.post(`${this.api}/processos/id/${processoId}/documentos/0/sigilo`, body, {headers: header});
//   }

//   /**
//    * Remove sigilo
//    * @param favorito Documento a remover o favorito
//    * @param processoId
//    */
//   removerSigiloso(sigiloso: object, processoId: number): Observable<object> {
//     const header = new HttpHeaders({ 'Content-Type': 'application/json' });
//     const body = JSON.stringify(sigiloso);

//     return this.http.patch(`${this.api}/processos/id/${processoId}/documentos/0/sigilo`, body, {headers: header });
//   }

//   /**
//    * Listar de Partes que pode atribuir visibilidade de sigilo ao documento
//    * @param processoId
//    * @param documentoId
//    */
//   listarParteDocumentoVisibilidadeSigilo(
//     params: HttpParams, processoId: number, documentoId: number)
//     : Observable<PessoaDocumentoSigiloPaginada> {
//     const header = new HttpHeaders({ 'Content-Type': 'application/json' });
//     return this.http.get<PessoaDocumentoSigiloPaginada>(
//       `${this.api}/processos/id/${processoId}/documentos/${documentoId}/sigilo/${documentoId}/visibilidadesigilo/`
//       , { headers: header, params: params });
//   }

//   /**
//    * Atribuir visibilidade de sigilo a Parte no documento
//    * @param processoId
//    * @param pessoaDocumentoSigilo dado para inserção de sigilo
//    */
//   salvarParteDocumentoVisibilidadeSigiloEmLote(processoId: number, documentoId: number,
//     parteDocumentoSigilos: ParteDocumentoSigilo[], params: HttpParams)
//     : Observable<object> {
//       const header = new HttpHeaders({ 'Content-Type': 'application/json' });
//       const body = JSON.stringify(parteDocumentoSigilos);
//       return this.http.post<object[]>(
//         `${this.api}/processos/id/${processoId}/documentos/${documentoId}/sigilo/` +
//         `${documentoId}/visibilidadesigilo` , body, {headers: header, params: params});
//   }

//   /**
//    * Remover todas as visibilidade de sigilosos em lote
//    * @param processoId
//    * @param documentoId
//    * @param pessoaDocumentoSigilo dado para inserção de sigilo
//    */
//   removerParteProcessoVisibilidadeSigiloEmLote(processoId: number, documentoId: number, parteDocumentoSigilos: ParteDocumentoSigilo[],
//       isLote: boolean )
//     : Observable<object> {
//       const header = new HttpHeaders({ 'Content-Type': 'application/json' });
//       const body = JSON.stringify(parteDocumentoSigilos);
//       return this.http.post<object[]>(
//         `${this.api}/processos/id/${processoId}/documentos/${documentoId}/sigilo/` +
//         `${documentoId}/visibilidadesigilo/ids/${isLote}`, body, {headers: header});
//   }

//   /**
//    * Verificar se o polo possui documentos com sigilo e visibilidade ativa e conseder
//    * as mesmas permissões a pessoa(Advogado).
//    * @param idProcesso identificador do processo.
//    * @param idPessoa identificador da pessoa que deseja receber as caracteristicas de sigilo do polo.
//    * @param idPartes lista de partes vinculadas(polos).
//    */
//   listarDocumentoComVisibilidadeSigiloPorPessoaDaParte(
//     idProcesso: number, idPartes: number[], idPessoa: number): Observable<ParteDocumentoSigilo[]> {
//     const header = new HttpHeaders({ 'Content-Type': 'application/json' });
//     let params = new HttpParams();
//     params = params.set('idProcesso', String(idProcesso))
//       .set('idPessoa', String(idPessoa))
//       .set('idPartes', String(idPartes[0]));
//     const endereco = `${this.api}/processos/id/${idProcesso}/documentos/0/sigilo/` +
//         `0/visibilidadesigilo/${idPessoa}/pessoa`;
//     return this.http.get<ParteDocumentoSigilo[]>(endereco, {headers: header, params: params});
//   }
}
