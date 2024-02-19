import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { APIService } from 'src/app/Services/api.service';
import { Carrito } from 'src/app/model/carrito';
import { ProductoCarrito } from 'src/app/model/producto-carrito';
import { Transaccion } from 'src/app/model/transaccion';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-confirmacion-compra',
  templateUrl: './confirmacion-compra.component.html',
  styleUrls: ['./confirmacion-compra.component.css']
})
export class ConfirmacionCompraComponent implements OnInit {

  dialog: HTMLDialogElement | null = null;

  carrito: Carrito = new Carrito;
  usuario: Usuario = new Usuario;

  constructor(private api: APIService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.dialog = document.querySelector('dialog');

    this.carrito = await this.api.cargarCarritoBBDD();
    this.usuario = await this.api.obtenerUsuario();
    if (this.carrito.listaProductosCarrito.length == 0) {
      alert('No hay productos en el carrito');
      this.router.navigateByUrl('cart');

    }

  }

  private async cuentaMetaMask(): Promise<string> {
    if (typeof window.ethereum == 'undefined') {
      throw new Error('MetaMask no está instalado');
    }

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];

    await window.ethereum.request({
      method: 'wallet_requestPermissions',
      params: [
        {
          "eth_accounts": { account }
        }
      ]
    });

    return account;
  }

  private async realizarTransaccion(transaccion: Transaccion): Promise<string> {
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: transaccion.from,
          to: transaccion.to,
          value: transaccion.value,
          gas: transaccion.gas,
          gasPrice: transaccion.gasPrice
        }
      ]
    });

    return txHash;
  }

  async comprarProductos() {
    const cuentaMetaMask = await this.cuentaMetaMask();
    let productos: ProductoCarrito[] = this.carrito.listaProductosCarrito;
    let transaccion = await this.api.comprarProductos(productos, cuentaMetaMask) as Transaccion;

    console.log(transaccion);

    const txHash = await this.realizarTransaccion(transaccion);
    const transaccionExitosa = await this.api.checkCompra(transaccion.id, txHash);

    console.log('Transacción realizada: ' + transaccionExitosa);

    const transactionMessage = transaccionExitosa
      ? 'Transacción realizada con éxito :D'
      : 'Transacción fallida :(';

    this.dialog!.querySelector('p')!.innerText = transactionMessage;
    this.dialog!.showModal();
  }

}

declare global {
  interface Window {
    ethereum: any;
  }
}