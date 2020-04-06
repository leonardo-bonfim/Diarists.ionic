import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConfiguracaoPage } from './configuracao.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { UsuarioComponent } from './usuario/usuario.component';
import { BrMaskerModule } from 'br-mask';

const routes: Routes = [
  { path: '', component: ConfiguracaoPage },
  { path: 'usuario', component: UsuarioComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    BrMaskerModule
  ],
  declarations: [ConfiguracaoPage, UsuarioComponent]
})
export class ConfiguracaoPageModule {}
