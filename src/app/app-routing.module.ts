import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthorizationGuard } from './guards/authorization.guard';
import { LastPageGuard } from './guards/last-page.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full', canActivate: [AuthorizationGuard]},
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', canLoad: [LastPageGuard]},
  { path: 'cadastro', loadChildren: './pages/cadastro/cadastro.module#CadastroPageModule'},
  { path: 'principal', loadChildren: './pages/principal/principal.module#PrincipalPageModule'},
  { path: 'procurar-contrato', loadChildren: './pages/procurar-contrato/procurar-contrato.module#ProcurarContratoPageModule'},
  { path: 'configuracao', loadChildren: './pages/configuracao/configuracao.module#ConfiguracaoPageModule'},
  { path: 'detalhe/:id', loadChildren: './pages/detalhe/detalhe.module#DetalhePageModule'},
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
