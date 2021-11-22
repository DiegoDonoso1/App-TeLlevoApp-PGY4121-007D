/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email= '';
  password= '';

  disabledbutton;

  constructor(public loadingController: LoadingController,
              private navCtrl: NavController,
              private router: Router,
              private toasctrl: ToastController,
              private alertctrl: AlertController,
              private loadingctrl: LoadingController,
              private userService: UserService,
              private menu: MenuController,
              ) { }

  ngOnInit() {
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    this.menu.enable(true);
  }

  onViewDidEnter(){
    this.disabledbutton=false;
  }

  async tryLogin(){
    // eslint-disable-next-line eqeqeq
    if(this.email == ''){
      this.presentToast('email vacio');
    // eslint-disable-next-line eqeqeq
    }else if(this.password==''){
      this.presentToast('contraseña vacia');
    }else{
      this.disabledbutton=true;
      const loading= await this.loadingctrl.create({
        message: 'Espera un poco',
      });
      await loading.present();

      return new Promise(resolve=>{
        let body ={
          action: 'login_progress',
          email: this.email,
          password: this.password
        };
        this.userService.login(body)
        .subscribe((res: any)=>{
          console.log(body);
          console.log(res);
          // eslint-disable-next-line no-cond-assign
          // eslint-disable-next-line eqeqeq
          if(res.message =='success'){
            loading.dismiss();
            this.disabledbutton=false;
            this.presentToast('Cargando');
            this.navCtrl.navigateRoot(['/house']);
          }else{
            loading.dismiss();
            this.disabledbutton=false;
            this.presentToast('Email o contraseña incorrecta');
          }
        });
      });
    }
  }
  async presentToast(a){
    const toast = await this.toasctrl.create({
      message: a,
      duration: 1500
    });
    toast.present();
  }

  async presentAlertConfirm(a){
    const alert =await this.alertctrl.create({
      header:a,
      backdropDismiss: false,
      buttons: [
        {
          text: 'cancelado',
          handler: (blah)=>{
            console.log('confirm cancel: blah');
          }
        },{
          text: 'intente otravez',
          handler: ()=>{
            this.tryLogin();
          }
        }
      ]
    });
    await alert.present();
  }


}
