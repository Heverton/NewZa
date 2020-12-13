import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImovelRoutingModule } from './imovel-routing.module';
import { ImovelComponent } from './imovel.component';
import { ImovelModalComponent } from './modal/imovel.modal.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ImovelRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    ImovelComponent,
    ImovelModalComponent
  ],
  providers: [ FormBuilder ]
})
export class ImovelModule {}
