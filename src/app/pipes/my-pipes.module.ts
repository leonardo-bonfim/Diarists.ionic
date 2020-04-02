import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DescricaoCurtaPipe } from './descricao-curta.pipe';
import { DistanciaFormatadaPipe } from './distancia-formatada.pipe';



@NgModule({
  declarations: [
    DescricaoCurtaPipe,
    DistanciaFormatadaPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DescricaoCurtaPipe,
    DistanciaFormatadaPipe
  ]
})
export class MyPipesModule { }
