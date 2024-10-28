import { DevolverInicioService } from './../../Services/devolver-inicio.service';
import { Component, OnInit } from '@angular/core';
import{ Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/Services/storage.service';
import { StudentsApiService } from 'src/app/Services/students-api.service';


@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  [x: string]: any;
  
 recuperacionCorreo: string = '';

 
 constructor(private router: Router, private toastController: ToastController, private storage: StorageService, private students:StudentsApiService, private DevolverInicioService:DevolverInicioService ) {}

  ngOnInit() {
  }

  envioAlHome(){
    this.DevolverInicioService.devolverInicio();
  }

 async btnCancelar(){
   const vueltaAlHome = await this.toastController.create({
     message:'Regresando al inicio!',
     duration:3000,
     color: 'success'
     
    });
    vueltaAlHome.present();
    this.envioAlHome()
}

async btnBuscar(){
  const correo = this.recuperacionCorreo. trim().toLowerCase().replace(/\s+/g,"");
  if(correo.includes('@duocuc.cl')){
    const correo = await this.toastController.create({

      message: 'Su correo es valido',
      duration: 3000,
      color: 'success',
      buttons: [
        {
          text: 'aceptar',
          handler: () => {
            console.log('Aceptar fue presionado');
          }
        }
      ]
    });
    correo.present();
    this.envioCambioContrasena()
  }else {
    const correo =  await this.toastController.create({

  })
  const error= await this.toastController.create({
    message: 'Verifica que tu correo sea de DUOC UC',
    duration: 3000,
    color: 'danger'
  });
  error.present();
  }
 }

 envioCambioContrasena(){
  this.router.navigate(['/cambio-contrasena'])
 }
 
}

  


