import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbasComponent } from './abas.component';
import { AvisosComponent } from '../avisos/avisos.component';

const routes: Routes = [
  {
    path: 'abas',
    component: AbasComponent,
    children: [
      {
        path: 'avisos',
        loadChildren: () => import('../avisos/avisos.module').then(m => m.AvisosModule)
      },
      {
        path: 'imovel',
        loadChildren: () => import('../imovel/imovel.module').then(m => m.ImovelModule)
      },
      {
        path: 'inquilino',
        loadChildren: () => import('../inquilino/inquilino.module').then(m => m.InquilinoModule)
      },
      {
        path: 'energia',
        loadChildren: () => import('../energia/energia.module').then(m => m.EnergiaModule)
      },
      {
        path: '',
        redirectTo: '/avisos',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/abas/avisos',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
