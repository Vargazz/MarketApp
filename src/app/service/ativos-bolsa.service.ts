import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_KEY, API_PATH } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AtivosBolsaService {

  public ATIVO: string = ""

  constructor(private httpCliente: HttpClient) { }

  recebeInput(input: string) {
    this.ATIVO = input 
    console.log(this.ATIVO);
    
  }

  obterAtivo() {
    return this.httpCliente.get(`${API_PATH}query?function=TIME_SERIES_DAILY&symbol=${this.ATIVO}&apikey=${API_KEY}`).toPromise();
  }
}
