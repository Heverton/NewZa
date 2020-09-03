import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImovelRoutingModule } from './imovel-routing.module';
import { ImovelComponent } from './imovel.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ImovelRoutingModule
  ],
  declarations: [ImovelComponent]
})
export class ImovelModule {}
