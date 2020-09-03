import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InquilinoComponent } from './inquilino.component';
import { InquilinoRoutingModule } from './inquilino-routing.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: InquilinoComponent }]),
    InquilinoRoutingModule,
  ],
  declarations: [InquilinoComponent]
})
export class InquilinoModule {}
