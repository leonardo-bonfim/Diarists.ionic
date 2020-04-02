import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProcurarContratoPage } from './procurar-contrato.page';
import { ComponentsModule } from './../../components/components.module';
import { MyPipesModule } from 'src/app/pipes/my-pipes.module';

const routes: Routes = [
  { path: '', component: ProcurarContratoPage },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    MyPipesModule
  ],
  declarations: [
    ProcurarContratoPage,
  ]
})
export class ProcurarContratoPageModule {}
