import { Injectable } from '@angular/core';

import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Injectable({
  providedIn:  'root'
})
export class RelatorioService {

  private pdf = [];

  inserirHeader(dados: string){
    this.pdf = [];
    this.pdf.push({text: dados, style: 'header'});
  }

  inserirSubHeader(dados: string){
    this.pdf.push({text: dados, style: 'subheader'});
  }

  inserirSubHeader2(dados: string){
    this.pdf.push({text: dados, style: 'subheader2'});
  }

  inserirSubHeader3(dados: string){
    this.pdf.push({text: dados, style: 'subheader3'});
  }

  inserirTabela(medidasDasColuna = [], nomeColunas = [], dadosColunas = []){
    const dadosBody = [];
    dadosBody.push(nomeColunas);

    dadosColunas.forEach(item => {
      dadosBody.push(item);
    });

    this.pdf.push({table: { widths: medidasDasColuna, body: dadosBody}, style: 'tableExample'});
  }

  imprimirRelatorio(): void {

    const dd = {
      content: this.pdf,
      styles: this.configurarStyleRelatorio(),
      pageSize: 'A4',
      pageOrientation: 'portrait'
    };

    pdfmake.vfs = pdfFonts.pdfMake.vfs;
    pdfmake.createPdf(dd).open();
  }

  private configurarStyleRelatorio() {
    const style = {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      subheader2: {
        fontSize: 13,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      subheader3: {
        fontSize: 13,
        bold: true,
        margin: [20, 10, 0, 5]
      },
      tableExample: {
        margin: [0, 5, 0, 15]
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black'
      },
      url: {
        fontSize: 16,
        alignment: 'left'
      }
    };
    return style;
  }

}
