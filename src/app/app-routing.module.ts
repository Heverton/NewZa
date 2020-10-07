import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './shared/auth/auth-guard.service';
import { RoleGuardService } from './shared/auth/role-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'sis',
    loadChildren: () => import('./abas/abas.module').then(m => m.AbasComponentModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin', // Teste com Role
    component: LoginComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRole: 'admin'
    }
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
