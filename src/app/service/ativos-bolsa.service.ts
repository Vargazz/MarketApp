import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AtivosBolsaService {

  public url: string = ''

  constructor(private httpCliente: HttpClient) { }

  obterAtivo() {

    return this.httpCliente.get(this.url).toPromise();

  }
}
