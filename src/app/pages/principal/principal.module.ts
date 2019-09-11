import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PrincipalPage } from './principal.page';
import { CriacaoContratoModalComponent } from './components/criacao-contrato-modal/criacao-contrato-modal.component';

const routes: Routes = [
  {
    path: '',
    component: PrincipalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PrincipalPage,
    CriacaoContratoModalComponent
  ],
  entryComponents: [
    CriacaoContratoModalComponent
  ]

})
export class PrincipalPageModule {}
