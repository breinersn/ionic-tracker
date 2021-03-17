import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UsuarioProvider } from '../usuario/usuario';
import { Subscription } from 'rxjs';

@Injectable()
export class UbicacionProvider {

  usuario: AngularFirestoreDocument<any>;
  private watch: Subscription;

  constructor(private geolocation: Geolocation,
              private afDb: AngularFirestore,
              public _usuarioProv: UsuarioProvider) {

  }
  inicializarUsuario(){

    this.usuario = this.afDb.doc(`/usuarios/${this._usuarioProv.clave}`);
  }

  iniciarGeoLocalizavion() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude

      this.usuario.update({
        lat: resp.coords.latitude,
        lng: resp.coords.longitude,
        clave: this._usuarioProv.clave
      });

    this.watch = this.geolocation.watchPosition()
    .subscribe((data) => {
     // data can be a set of coordinates, or an error (if an error occurred).
     // data.coords.latitude
     // data.coords.longitude

     this.usuario.update({
      lat: data.coords.latitude,
      lng: data.coords.longitude,
      clave: this._usuarioProv.clave
    });

});

     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  detenerUbicacion(){
    try {
      this.watch.unsubscribe();
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }
}
