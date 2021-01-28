import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Role } from '../shared/auth/role';
import { InquilinoComponent } from './inquilino.component';

const routes: Routes = [
  {
    path: '',
    component: InquilinoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InquilinoRoutingModule {}
