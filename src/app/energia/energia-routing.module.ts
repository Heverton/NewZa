import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnergiaComponent } from './energia.component';

const routes: Routes = [
  {
    path: '',
    component: EnergiaComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnergiaRoutingModule {}
