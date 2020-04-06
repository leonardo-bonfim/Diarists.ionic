import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PrincipalPage } from './principal.page';
import { CriacaoContratoModalComponent } from './components/criacao-contrato-modal/criacao-contrato-modal.component';
import { BrMaskerModule } from 'br-mask';
import { AuthorizationGuard } from 'src/app/guards/authorization.guard';

const routes: Routes = [
  { path: '', component: PrincipalPage, canActivate: [AuthorizationGuard]}
];

@NgModule({
  imports: [
    BrMaskerModule,
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
