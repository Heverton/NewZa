import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InquilinoComponent } from './inquilino.component';

const routes: Routes = [
  {
    path: '',
    component: InquilinoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InquilinoRoutingModule {}
