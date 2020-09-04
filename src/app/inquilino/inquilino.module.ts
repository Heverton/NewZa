import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { InquilinoComponent } from './inquilino.component';
import { InquilinoRoutingModule } from './inquilino-routing.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: InquilinoComponent }]),
    InquilinoRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [InquilinoComponent],
  providers: [
    FormBuilder
  ]
})
export class InquilinoModule {}
