import { Component } from '@angular/core';
import { NavController,  LoadingController } from 'ionic-angular';

import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {



  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public loadinCtrl: LoadingController,
              public _usuarioprov: UsuarioProvider) {
  }

  ionViewDidLoad() {

    this.slides.paginationType = "progress"; //estilo barra de progreso

    //bloquear slide
    this.slides.lockSwipes(true);
    this.slides.freeMode = false;

  }

  mostrarInput() {
    this.alertCtrl.create({
      title: 'Ingreso de Usuario',
      inputs: [
        {
          name: 'clave',
          placeholder: 'Digite su Codigo'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
          },{
            text: 'Ingresar',
            handler: date => {
              this.verificarUsuario(date.clave);
          }
        }
      ]
    }).present();
  }

  verificarUsuario(clave: string) {
    let loading = this.loadinCtrl.create({
      content: 'Verificando'
    });

    loading.present();
    loading.dismiss();

    //si hay caracteres en la clave corre, sino "providers" { provide: FirestoreSettingsToken, useValue: {} } de '@angular/fire/firestore'
 if(clave){

  this._usuarioprov.verificaUsuario(clave)
    .then(existe => {


      if(existe){
        this.slides.lockSwipes(false);
        this.slides.freeMode = true;

        this.slides.slideNext()

        this.slides.lockSwipes(true);
        this.slides.freeMode = false;

      }else{
        this.alertCtrl.create({
          title: 'Usuario no Encontrado',
          buttons: ['Aceptar']
        }).present();

      }
    })
}
//else {
 // this.alertCtrl.create({
 //   title: 'Dijite su Codigo',
 //   buttons: ['Aceptar']
 // }).present();
//}


  //  setTimeout(() => {
  //   loading.dismiss();
  //  }, 1000);

  }


  ingresar() {
    this.navCtrl.setRoot( HomePage );
  }
}
