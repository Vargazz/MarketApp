import { Component, OnInit } from '@angular/core';
import { AtivosBolsaService } from '../service/ativos-bolsa.service';

@Component({
  selector: 'app-ultimas-negociacoes',
  templateUrl: './ultimas-negociacoes.component.html',
  styleUrls: ['./ultimas-negociacoes.component.css']
})
export class UltimasNegociacoesComponent implements OnInit{

  public inputSearch: string = ""

  public ativosArray: any

  public ultimas5Datas: string[] = []

  constructor(private ativosService: AtivosBolsaService) {

  }

  ngOnInit(): void {

  } 

  setUltimo() {
    const timeSeries = this.ativosArray["Time Series (Daily)"]
    const altSeries = Object.keys(timeSeries).reverse()
    this.ultimas5Datas = altSeries.slice(-5).reverse()
  }

  searchButton() {
    this.ativosService.recebeInput(this.inputSearch)

    this.ativosService.obterAtivo().subscribe((ativo) => {
      
      this.ativosArray = ativo
      
      this.setUltimo()
    })
    this.inputSearch = ""
  }

}
