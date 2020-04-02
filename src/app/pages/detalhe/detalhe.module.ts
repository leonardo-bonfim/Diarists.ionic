import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetalhePage } from './detalhe.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { MyPipesModule } from 'src/app/pipes/my-pipes.module';

const routes: Routes = [
  {
    path: '',
    component: DetalhePage
  }
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
  declarations: [DetalhePage]
})
export class DetalhePageModule {}
