import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProcurarContratoPage } from './procurar-contrato.page';
import { ComponentsModule } from './../../components/components.module';
import { DescricaoCurtaPipe } from 'src/app/pipes/descricao-curta.pipe';
import { DistanciaFormatadaPipe } from 'src/app/pipes/distancia-formatada.pipe';

const routes: Routes = [
  { path: '', component: ProcurarContratoPage },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ProcurarContratoPage,
    DescricaoCurtaPipe,
    DistanciaFormatadaPipe
  ]
})
export class ProcurarContratoPageModule {}
