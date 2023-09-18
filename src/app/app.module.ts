import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UltimasNegociacoesComponent } from './ultimas-negociacoes/ultimas-negociacoes.component';

@NgModule({
  declarations: [
    AppComponent,
    UltimasNegociacoesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
