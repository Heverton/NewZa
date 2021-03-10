import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbasComponent } from './abas.component';

const routes: Routes = [
  {
    path: 'abas',
    component: AbasComponent,
    children: [
      {
        path: 'aviso',
        loadChildren: () => import('../aviso/aviso.module').then(m => m.AvisoModule)
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
        path: 'Leitura',
        loadChildren: () => import('../leitura/leitura.module').then(m => m.LeituraModule)
      },
      {
        path: 'login',
        loadChildren: () => import('../login/login.module').then(m => m.LoginModule)
      },
      {
        path: '',
        redirectTo: '/aviso',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/abas/aviso',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
