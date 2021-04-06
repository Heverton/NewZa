import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { MensagemComponente } from 'src/app/shared/components/mensagem.component';

import { LeituraService } from '../../shared/api/leitura.service';
import { RelatorioService } from '../../shared/api/relatorio.service';
import { UsuarioLogado } from '../../shared/auth/usuario-logado';
import { Leitura } from '../leitura';
import { MedidorConsumo } from '../medidor-consumo';
import { ValorConsumo } from '../tipo-medidor-consumo';
import { TipoMedidorEnum } from '../tipo-medidor-enum';
import { VisualizaLeituraModalComponent } from '../visualiza-leitura-modal/visualiza-leitura-modal.component';

@Component({
  selector: 'app-leitura',
  templateUrl: 'leitura.modal.component.html',
  styleUrls: ['leitura.modal.component.scss']
})
export class LeituraModalComponent implements OnInit {

  @Input() item: MedidorConsumo;
  formb: FormGroup;
  leitura = new Leitura();

  leituras = new Array<Leitura>();
  isAdministrador = UsuarioLogado.getUsuarioLogadoPerfilAdministrador();

  constructor(private service: LeituraService,
              private formBuilder: FormBuilder, private alertController: AlertController,
              private md: ModalController, private relatorioService: RelatorioService,
              private mensagem: MensagemComponente
  ) {

    this.formb = this.formBuilder.group({
      id: [],
      medidorConsumo: [''],
      numeroleitura: [''],
      dataleitura: [new Date()],
    });
  }

  ngOnInit(): void {
    this.leitura.dataleitura = new Date();
    this.leitura.medidorConsumo = this.item;
    this.formb.controls.medidorConsumo.setValue(this.item);
    this.formb.controls.numeroleitura.setValue(0);
  }

  salvar(): void {
    this.preparDados();

    this.service.buscarUltimaLeitura(this.leitura.medidorConsumo.id).subscribe(result => {
      if (result === null || this.leitura.dataleitura >= result.dataleitura && this.leitura.numeroleitura >= result.numeroleitura) {
        this.service.inserir(this.leitura).subscribe(async result => {
          this.action();
        }, err => {
          console.log('Erro', err);
        });
      } else {
        this.mensagem.presentToast('Não pode ter um data ou número da leitura menor que o anterior!');
      }
    }, err => {
      console.log('Erro', err);
    });
  }

  editar(): void {
    // this.preparDados();
    // this.service.editar(this.leitura).subscribe(async result => {
    //   this.action();
    // }, err => {
    //   console.log('Erro', err);
    // });
  }

  excluir(): void {
    // this.preparDados();
    // this.service.excluir(this.leitura).subscribe(async result => {
    //   this.action();
    // }, err => {
    //   console.log('Erro', err);
    // });
  }

  voltar(): void {
    //  Retorna para o que criou a modal
    this.md.dismiss({ 'dismissed': true });
  }

  private async action(): Promise<void> {
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
  }

  private preparDados(): void {
    this.leitura.medidorConsumo = this.item;
    this.leitura.numeroleitura = this.formb.value.numeroleitura;
    this.leitura.dataleitura = this.formb.value.dataleitura;
  }

  async ativaModal(itemmodal: MedidorConsumo): Promise<void> {
    const modal = await this.md.create({
      component: VisualizaLeituraModalComponent,
      cssClass: 'modal-class',
      componentProps: {item: itemmodal},
      swipeToClose: true,
      presentingElement: await this.md.getTop(),
    });
    // init modal
    await modal.present();
    // Retorno no close
    const dadosCloseModal = await modal.onDidDismiss();
    if (dadosCloseModal) {
      this.ngOnInit();
    }
  }

  // https://medium.com/@rakeshuce1990/ionic-how-to-create-pdf-file-with-pdfmake-step-by-step-75b25aa541a4
  imprimirLeitura(): void {

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    this.service.buscarIdMedidor(this.leitura.medidorConsumo.id).subscribe(result => {
      const valorConsumo = VisualizaLeituraModalComponent.realizarCalculo(result);

      if (this.leitura.medidorConsumo.tipoMedidorConsumo.id === TipoMedidorEnum.AGUA) {
        this.relatorioService.inserirHeader('Relatório de leitura de Água');
      } else if (this.leitura.medidorConsumo.tipoMedidorConsumo.id === TipoMedidorEnum.LUZ) {
        this.relatorioService.inserirHeader('Relatório de leitura de Energia');
      }

      this.relatorioService.inserirSubHeader('');

      const medidasDasColuna = [100, '*', '*', '*', '*'];
      const nomeColunas = ['Mês', 'Número anterior:', 'Número atual:', 'Diferença', 'Total:'];

      const dadosColunas = [];

      valorConsumo.forEach(dados => {

        dadosColunas.push([monthNames[new Date(dados.dataLeituraAtual).getMonth()], dados.numeroAnterior, dados.numeroAtual,
          dados.quantidade + ' ' + dados.unidadeMedida, 'R$: ' + dados.valor]);

      });

      this.relatorioService.inserirTabela(medidasDasColuna, nomeColunas, dadosColunas);
      this.relatorioService.inserirSubHeader2('Observação:');
      this.relatorioService.inserirSubHeader3('');

      this.relatorioService.imprimirRelatorio();
    });


  }
}
