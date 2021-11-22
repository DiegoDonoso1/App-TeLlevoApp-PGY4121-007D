import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
})
export class RecoverPage implements OnInit {

  constructor(public loadingController: LoadingController,
              private navCtrl: NavController) { }

  ngOnInit() {
  }

  goToLogin(){
    this.navCtrl.navigateForward('/login');
  }

  async Loading() {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      duration: 1000,
      message: 'Se ha enviado tu nueva contraseña a tu correo',
      cssClass: 'custom-class custom-loading',
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    this.goToLogin();
  }
}
