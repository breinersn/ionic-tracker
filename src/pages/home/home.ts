import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UbicacionProvider } from '../../providers/ubicacion/ubicacion';
import { LoginPage } from '../login/login';
import { UsuarioProvider } from '../../providers/usuario/usuario';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: any = {};

  lat: number;
  lng: number;

  constructor(public navCtrl: NavController,
              public _ubicacionProv: UbicacionProvider,
              public _usuarioProv: UsuarioProvider) {

      this._ubicacionProv.iniciarGeoLocalizavion();
      this._ubicacionProv.inicializarUsuario();

      this._ubicacionProv.usuario.valueChanges().subscribe(data => {
        this.user = data;
      });
  }

  salir(){

    this.navCtrl.setRoot(LoginPage);
    this._ubicacionProv.detenerUbicacion();
    this._usuarioProv.borrarUsuario();
  }

}
