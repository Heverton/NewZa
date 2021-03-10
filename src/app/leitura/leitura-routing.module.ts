import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeituraComponent } from './leitura.component';

const routes: Routes = [
  {
    path: '',
    component: LeituraComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeituraRoutingModule {}
