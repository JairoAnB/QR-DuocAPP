import { Component, OnInit } from '@angular/core';
import{ Router } from '@angular/router';
import { ToastController } from '@ionic/angular';





@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  [x: string]: any;
  
 recuperacionCorreo: string = '';

 
  constructor( 
    private toastController: ToastController,
    private router: Router   ) {

   }

  ngOnInit() {
  }

  envioAlHome(){
    this.router.navigate(['/home'])
  }

 async btnCancelar(){
   const vueltaAlHome = await this.toastController.create({
     message:'Devuelta al Home!!',
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

      message: 'Se ha enviado un correo a su cuenta institucional....',
      duration: 3000,
      color: 'success'
    });
    correo.present();
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
}

  


