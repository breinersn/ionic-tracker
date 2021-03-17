import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs';


@Injectable()
export class UsuarioProvider {

  clave: string;
  user: any;
  private doc: Subscription;

  constructor(public afDB :AngularFirestore,
              private platfom: Platform,
              private storage: Storage) {

  }

  verificaUsuario(clave: string) {
    return new Promise((resolve, reject) => {

      this.doc = this.afDB.doc(`/usuarios/${clave}`)
      .valueChanges().subscribe(date => {

        if(date) {
          this.clave = clave;
          this.user = date;
          this.guardarStorage();
          resolve(true);

        }else {
          resolve(false);

        }
      });
    });
  }


  guardarStorage() {

    if (this.platfom.is('cordova')) {
      //celular
      this.storage.set('clave', this.clave);
    } else {
      //escritorio
      localStorage.setItem('clave',this.clave);
    }
  }

  cargarStorage() {

    return new Promise((resolve,reject) => {

      if (this.platfom.is('cordova')) {
        //celular
        this.storage.get('clave').then((val) => {

          if(val){
            this.clave = val;
            resolve(true);
          } else {
            resolve(false);
          }
        });
      } else {
        //escritorio
        if(localStorage.getItem('clave')){
          this.clave = localStorage.getItem('clave');
          resolve(true);
        } else {
          resolve(false);
        }
      }
    });
  }

  borrarUsuario(){
    this.clave = null;

    if (this.platfom.is('cordova')) {
      this.storage.remove('clave');
    } else {
      localStorage.removeItem('clave');
    }

    this.doc.unsubscribe();
  }
}
