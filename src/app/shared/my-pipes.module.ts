import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DescricaoCurtaPipe } from '../pipes/descricao-curta.pipe';
import { DistanciaFormatadaPipe } from '../pipes/distancia-formatada.pipe';



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
