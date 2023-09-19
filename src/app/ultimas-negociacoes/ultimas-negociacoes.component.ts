import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { AtivosBolsaService } from '../service/ativos-bolsa.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-ultimas-negociacoes',
  templateUrl: './ultimas-negociacoes.component.html',
  styleUrls: ['./ultimas-negociacoes.component.css']
})
export class UltimasNegociacoesComponent implements OnInit{

  public inputSearch: string = ""
  
  public ativosArray: any
  
  public ultimas5Datas: string[] = []

  public maxValue: number = 0
  public minValue: number = 0
  public averageValue: number = 0


  constructor(private ativosService: AtivosBolsaService) {
    
  }
  
  private chart: any;
  ngOnInit(): void {
    this.chart = null
  }

  @ViewChild('myChart') private chartRef!: ElementRef;


  setUltimo() {
    const timeSeries = this.ativosArray["Time Series (Daily)"]
    const altSeries = Object.keys(timeSeries).reverse()
    this.ultimas5Datas = altSeries.slice(-5).reverse()
    console.log(this.ativosArray["Time Series (Daily)"]);

  }
  
  calcValueGrafic() {
    const highValues = this.ultimas5Datas.map(date => parseFloat(this.ativosArray["Time Series (Daily)"][date]['2. high']));
    const lowValues = this.ultimas5Datas.map(date => parseFloat(this.ativosArray["Time Series (Daily)"][date]['3. low'])); 
    
    this.maxValue = Math.max(...highValues)
    this.minValue = Math.min(...lowValues)
    this.averageValue =((this.maxValue + this.minValue) / 2)
  }
  
  searchButton() {
    this.ativosService.recebeInput(this.inputSearch)
    
    this.ativosService.obterAtivo().subscribe((ativo) => {
      
      this.ativosArray = ativo
      
      this.setUltimo()
      this.calcValueGrafic()
      this.createChart();
    })
    this.inputSearch = ""
  }

  createChart() {
    if(!this.chart) {
    const ctx = this.chartRef.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Máximo', 'Médio', 'Minimo'],
        datasets: [{
          label: 'Valores',
          data: [this.maxValue, parseFloat(this.averageValue.toFixed(2)), this.minValue],
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
        maintainAspectRatio: false, 
        responsive:true,
        scales: {
          y: {
            type: 'linear',
            beginAtZero: true,
            max: this.maxValue + 10
          }
        }
      }
    });
  } else  {
    this.chart.destroy();
    this.chart = null
    const ctx = this.chartRef.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Máximo', 'Médio', 'Minimo'],
        datasets: [{
          label: 'Valores',
          data: [this.maxValue, parseFloat(this.averageValue.toFixed(2)), this.minValue],
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
        maintainAspectRatio: false, 
        responsive:true,
        scales: {
          y: {
            type: 'linear',
            beginAtZero: true,
            max: this.maxValue + 10
          }
        }
      }
    })
    }
  }

}
