import { TransferenciaService } from './../services/transferencia.service';
import { HttpClient } from '@angular/common/http';
import { Component, Output, EventEmitter } from "@angular/core";
import { Transferencia } from '../models/transferencia.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nova-transferencia',
    templateUrl: './nova-transferencia.component.html',
    styleUrls: ['./nova-transferencia.component.scss']
})
export class NovaTransferenciaComponent{

  @Output() aoTransferir = new EventEmitter<any>();

  valor: number;
  destino: number;
  constructor(private service: TransferenciaService, private router: Router) {
  }

  transferir() {
    console.log('Solicitada nova transferencia');
    const valorEmitir: Transferencia = {valor: this.valor, destino: this.destino};
    this.aoTransferir.emit(valorEmitir);

    this.service.adicionar(valorEmitir)
    .subscribe(resultado => {
      console.log(resultado);
      this.limparCampos();
      this.router.navigateByUrl('extrato');
    },
    error => console.error(error)
    );
  }

  limparCampos() {
    this.valor = null;
    this.destino = null;
  }
}
