import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { promise } from 'selenium-webdriver';
import { User } from '../models/user.interface';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email='';
  password='';

  disabledbutton;

  constructor(public loadingController: LoadingController,
    private navCtrl: NavController,
    private userService: UserService,
    private menu: MenuController,
    private loadingctrl: LoadingController,
    private alertctrl: AlertController,
    private toastctrl: ToastController, ) { }

  ngOnInit() {
    this.menu.enable(false);
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  /*AddNewUser(email,password){
    const USER: User = {
      email: email.value,
      password: password.value,
      id:null
    };this.userService.addUser(USER)
    .subscribe(data =>{
      this.navCtrl.navigateForward('/login');
    });
  }*/

  ionViewDidEnter(){
    this.disabledbutton= false;
  }

  async tryRegistration(){
    // eslint-disable-next-line eqeqeq
    if(this.email == ''){
      this.presentToast('Ingrese su correo');
    // eslint-disable-next-line eqeqeq
    }else if(this.password==''){
      this.presentToast('Ingrese su contraseña');
    }else{
      this.disabledbutton = true;
      const loading = await this.loadingctrl.create({
        message: 'espera un momento..',
      });
      await loading.present();

      return new Promise(resolve =>{
        const body={
          action: 'registration_progress',
          email: this.email,
          password: this.password,
          id: null
        };
        this.userService.addUser(body)
        .subscribe((res: any)=>{
          console.log(body);
          console.log(res);
          // eslint-disable-next-line eqeqeq
          if(res.message =='success'){
            loading.dismiss();
            this.disabledbutton=false;
            this.presentToast('Cargando');
            this.navCtrl.navigateRoot(['/login']);
          }else{
            loading.dismiss();
            this.disabledbutton=false;
            this.presentToast('Usuario ya registrado');
          }
        });
      });
    }
  }
  async presentToast(a){
    const toast = await this.toastctrl.create({
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
            this.tryRegistration();
          }
        }
      ]
    });
    await alert.present();
  }



}
