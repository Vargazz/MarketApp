import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { AtivosBolsaService } from '../service/ativos-bolsa.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-ultimas-negociacoes',
  templateUrl: './ultimas-negociacoes.component.html',
  styleUrls: ['./ultimas-negociacoes.component.css']
})
export class UltimasNegociacoesComponent implements AfterViewInit{

  public inputSearch: string = ""
  
  public ativosArray: any
  
  public ultimas5Datas: string[] = []
  
  constructor(private ativosService: AtivosBolsaService) {
    
  }
  
  @ViewChild('myChart') private chartRef!: ElementRef;
  private chart: any;

  ngAfterViewInit(): void {
    this.createChart();
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

  createChart() {
    if(this.chartRef) {
    const ctx = this.chartRef.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Máximo', 'Médio', 'Minimo'],
        datasets: [{
          label: 'Valores',
          data: [36, 30, 33],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            type: 'linear',
            beginAtZero: true
          }
        }
      }
    });
  }else {
    console.error('Não foi possível obter o contexto do canvas.');
}
  }

}
