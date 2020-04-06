import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetalhePage } from './detalhe.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { MyPipesModule } from 'src/app/pipes/my-pipes.module';
import { AgmCoreModule } from '@agm/core';
import { AuthorizationGuard } from 'src/app/guards/authorization.guard';

const routes: Routes = [
  { path: '', component: DetalhePage, canActivate: [AuthorizationGuard] }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    MyPipesModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBR1bJW8zHDDIEbihZ_dqdjtTIBvAI5Ey0'
    })
  ],
  declarations: [DetalhePage]
})
export class DetalhePageModule {}
