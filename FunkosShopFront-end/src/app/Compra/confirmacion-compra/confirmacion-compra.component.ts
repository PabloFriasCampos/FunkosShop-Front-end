import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from 'src/app/Services/api.service';
import { TotalCarritoService } from 'src/app/Services/total-carrito.service';
import { Carrito } from 'src/app/model/carrito';
import { ProductoCarrito } from 'src/app/model/producto-carrito';
import { Transaccion } from 'src/app/model/transaccion';
import { Usuario } from 'src/app/model/usuario';
import { NgxToastService } from 'ngx-toast-notifier';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-confirmacion-compra',
  templateUrl: './confirmacion-compra.component.html',
  styleUrls: ['./confirmacion-compra.component.css']
})
export class ConfirmacionCompraComponent implements OnInit {

  dialog: HTMLDialogElement | null = null;

  carrito: Carrito = new Carrito;
  usuario: Usuario = new Usuario;
  eth: number = 0;
  esperaCompra: boolean = false;
  textoPago: string = "Confirmar Pago";

  constructor(private api: APIService, private router: Router, private carritoService: TotalCarritoService, private ngxToastService: NgxToastService) { }

  async ngOnInit(): Promise<void> {

    this.carrito = await this.api.cargarCarrito();
    if (this.carrito.listaProductosCarrito.length == 0) {
      this.ngxToastService.onWarning('No hay productos en el carrito', '');
      this.router.navigateByUrl('cart');

    }
    this.usuario = await this.api.obtenerUsuario();
    this.eth = await this.api.obtenerETH();

  }

  private async cuentaMetaMask(): Promise<string> {
    if (typeof window.ethereum == 'undefined') {
      // throw new Error('MetaMask no está instalado');
      this.ngxToastService.onInfo('Instala MetaMask para realizar el pago', '')
      this.esperaCompra = false;
      this.textoPago = "Confirmar Pago";
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
    try {
      this.esperaCompra = true;
      this.textoPago = "Espere...";

      const cuentaMetaMask = await this.cuentaMetaMask();
      let productos: ProductoCarrito[] = this.carrito.listaProductosCarrito;
      let transaccion = await this.api.comprarProductos(productos, cuentaMetaMask) as Transaccion;

      const txHash = await this.realizarTransaccion(transaccion);
      const transaccionExitosa = await this.api.checkCompra(transaccion.id, txHash);

      const transactionMessage = transaccionExitosa
        ? 'Transacción realizada con éxito :D'
        : 'Transacción fallida :(';

      this.ngxToastService.onInfo(transactionMessage, '');

      if (transaccionExitosa) {
        this.router.navigateByUrl('');
        sessionStorage.removeItem('carrito');
        this.carritoService.cambiarTotal();
        this.esperaCompra = false;
        this.textoPago = "Confirmar Pago";
      } else {
        this.esperaCompra = false;
        this.textoPago = "Confirmar Pago";
      }
    } catch (error) {
      // Manejar la excepción y mostrar un alert con el mensaje de error
      console.error("Error al comprar productos:", error);
      const errorMessage = this.obtenerMensajeDeError(error);
      this.ngxToastService.onDanger(errorMessage, '');

      this.esperaCompra = false;
      this.textoPago = "Confirmar Pago";
    }
  }

  obtenerMensajeDeError(error: any): string {
    if (error instanceof HttpErrorResponse && typeof error.error === 'string') {
      const match = error.error.match(/No hay stock suficiente para el producto ([^\r\n]+)/);
      return match ? match[0] : "Error al procesar la solicitud. Por favor, inténtelo de nuevo.";
    }

    return "Error al procesar la solicitud. Por favor, inténtelo de nuevo.";
  }


}

declare global {
  interface Window {
    ethereum: any;
  }
}