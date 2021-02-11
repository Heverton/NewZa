import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';

import { Inquilino } from '../../inquilino/Inquilino';
import { EnergiaService } from '../../shared/api/energia.service';
import { InquilinoService } from '../../shared/api/inquilino.service';
import { RelatorioService } from '../../shared/api/relatorio.service';
import { UsuarioLogado } from '../../shared/auth/usuario-logado';
import { Energia } from '../energia';

@Component({
  selector: 'app-energia',
  templateUrl: 'energia.modal.component.html',
  styleUrls: ['energia.modal.component.scss']
})
export class EnergiaModalComponent implements OnInit {

  @Input() item: Energia;
  formb: FormGroup;
  inquilinos: Inquilino[];
  isAdministrador = UsuarioLogado.getUsuarioLogadoPerfilAdministrador();

  constructor(private service: EnergiaService,  private inquiService: InquilinoService,
              private formBuilder: FormBuilder, private alertController: AlertController,
              private md: ModalController, private relatorioService: RelatorioService,
  ) {

    this.formb = this.formBuilder.group({
      id: [],
      nomeinquilino: [''],
      numeromedidor: [''],
      numeroalterior: [0],
      numeroatual: [0],
      dataleitura: [new Date()],
    });
  }

  ngOnInit(): void {
    if (UsuarioLogado.getUsuarioLogadoPerfilCliente()) {
      this.inquiService.buscarId(UsuarioLogado.getUsuarioLogadoId()).subscribe(result => {
        this.inquilinos = result;
      });
    } else {
      this.inquiService.buscarAll().subscribe(result => {
        console.log('imovelService', result);
        this.inquilinos = result;
      });
    }

    this.formb.patchValue(this.item);
    console.log('this.item', this.item);
  }

  salvar(): void {
    this.preparDados();
    this.service.inserir(this.item).subscribe(async result => {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Sucesso',
        message: 'Realizado com sucesso.',
        buttons: ['OK']
      });
      await alert.present();
      setTimeout(() => {
        alert.dismiss();
        //  Retorna para o que criou a modal
        this.md.dismiss({ 'dismissed': true });
      }, 1200);
    }, err => {
      console.log('Erro', err);
    });
  }

  editar(): void {
    this.preparDados();
    this.service.editar(this.item).subscribe(async result => {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Sucesso',
        message: 'Realizado com sucesso.',
        buttons: ['OK']
      });
      await alert.present();
      setTimeout(() => {
        alert.dismiss();
        //  Retorna para o que criou a modal
        this.md.dismiss({ 'dismissed': true });
      }, 1200);
    }, err => {
      console.log('Erro', err);
    });
  }

  excluir(): void {
    this.preparDados();
    this.service.excluir(this.item).subscribe(async result => {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Sucesso',
        message: 'Realizado com sucesso.',
        buttons: ['OK']
      });
      await alert.present();
      setTimeout(() => {
        alert.dismiss();
        //  Retorna para o que criou a modal
        this.md.dismiss({ 'dismissed': true });
      }, 1200);
    }, err => {
      console.log('Erro', err);
    });
  }

  voltar(): void {
    //  Retorna para o que criou a modal
    this.md.dismiss({ 'dismissed': true });
  }

  private preparDados(): void {
    this.item = this.formb.value;
    this.item.nomeinquilino = this.inquilinos.find(data => data.nome === this.formb.value.nome).nome;
  }

  // https://medium.com/@rakeshuce1990/ionic-how-to-create-pdf-file-with-pdfmake-step-by-step-75b25aa541a4
  imprimirLeitura(): void {

    this.relatorioService.inserirHeader('Leitura da energia');
    this.relatorioService.inserirSubHeader('');

    const medidasDasColuna = [100, '*', '*', '*', '*'];
    const nomeColunas = ['Mês', 'Número anterior:', 'Número atual:', 'Diferença', 'Total:'];

    const dadosColunas = [];
    dadosColunas.push(['Janeiro', '123123.2', '21212.3', '121212.3', 'R$:']);
    dadosColunas.push(['Fevereiro', '123123.2', '21212.3', '121212.3', 'R$:']);
    dadosColunas.push(['Março', '123123.2', '21212.3', '121212.3', 'R$:']);
    dadosColunas.push(['Abril', '123123.2', '21212.3', '121212.3', 'R$:']);
    dadosColunas.push(['Maio', '123123.2', '21212.3', '121212.3', 'R$:']);
    dadosColunas.push(['Junho', '123123.2', '21212.3', '121212.3', 'R$:']);
    dadosColunas.push(['Julho', '123123.2', '21212.3', '121212.3', 'R$:']);
    dadosColunas.push(['Agosto', '123123.2', '21212.3', '121212.3', 'R$:']);
    dadosColunas.push(['Setembro', '123123.2', '21212.3', '121212.3', 'R$:']);
    dadosColunas.push(['Novembro', '123123.2', '21212.3', '121212.3', 'R$:']);
    dadosColunas.push(['Outubro', '123123.2', '21212.3', '121212.3', 'R$:']);
    dadosColunas.push(['Dezembro', '123123.2', '21212.3', '121212.3', 'R$:']);

    this.relatorioService.inserirTabela(medidasDasColuna, nomeColunas, dadosColunas);
    this.relatorioService.inserirSubHeader2('Observação:');
    this.relatorioService.inserirSubHeader3('A leitura será realizada.');

    this.relatorioService.imprimirRelatorio();

      // content: [
      //     {text: 'Leitura da energia', style: 'header'},
      //     {text: '', style: 'subheader'},
      //     {
      //       style: 'tableExample',
      //       table: {
      //         widths: [100, '*', '*', '*', '*'],
      //         body: [
      //           ['Mês','Número anterior:', 'Número atual:', 'Diferença', 'Total:'],
      //           ['Janeiro', '123123.2', '21212.3', '121212.3', 'R$:'],
      //           ['Fevereiro', '123123.2', '21212.3', '121212.3', 'R$:'],
      //           ['Março', '123123.2', '21212.3', '121212.3', 'R$:'],
      //           ['Abril', '123123.2', '21212.3', '121212.3', 'R$:'],
      //           ['Maio', '123123.2', '21212.3', '121212.3', 'R$:'],
      //           ['Junho', '123123.2', '21212.3', '121212.3', 'R$:'],
      //           ['Julho', '123123.2', '21212.3', '121212.3', 'R$:'],
      //           ['Agosto', '123123.2', '21212.3', '121212.3', 'R$:'],
      //           ['Setembro', '123123.2', '21212.3', '121212.3', 'R$:'],
      //           ['Novembro', '123123.2', '21212.3', '121212.3', 'R$:'],
      //           ['Outubro', '123123.2', '21212.3', '121212.3', 'R$:'],
      //           ['Dezembro', '123123.2', '21212.3', '121212.3', 'R$:']
      //         ]
      //       }
      //     },
      //     {text: 'Observação:', style: 'subheader2'},
      //     {text: '<Leitura todo dia>:', style: 'subheader3'},
      // ]
  }
}
