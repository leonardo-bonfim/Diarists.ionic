import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'principal',
        loadChildren: '../pages/principal/principal.module#PrincipalPageModule'
      },
      {
        path: 'procurar-contrato',
        loadChildren: '../pages/procurar-contrato/procurar-contrato.module#ProcurarContratoPageModule'
      },
      {
        path: 'configuracao',
        loadChildren: '../pages/configuracao/configuracao.module#ConfiguracaoPageModule'
      },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
