import { Component, OnInit } from '@angular/core';
import { AtivosBolsaService } from '../service/ativos-bolsa.service';

@Component({
  selector: 'app-ultimas-negociacoes',
  templateUrl: './ultimas-negociacoes.component.html',
  styleUrls: ['./ultimas-negociacoes.component.css']
})
export class UltimasNegociacoesComponent implements OnInit{

  public inputSearch: string = ""

  constructor(private ativosService: AtivosBolsaService) {

  }

  ngOnInit(): void {
    
  }

  searchButton() {
    this.ativosService.recebeInput(this.inputSearch)

    this.ativosService.obterAtivo()
      .then(ativo => console.log(ativo))
      .catch(error => console.log(error))

    this.inputSearch = ""
  }

}
