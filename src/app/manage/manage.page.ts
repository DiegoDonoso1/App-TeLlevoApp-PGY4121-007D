import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { User } from '../models/user.interface';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.page.html',
  styleUrls: ['./manage.page.scss'],
})
export class ManagePage implements OnInit {
  users = [];

  constructor(private userService: UserService,
              private alertController: AlertController,
              private toastController: ToastController) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.userService.loadUser()
    .subscribe(data =>{
      console.log(data.users);
      this.users= data.users ;
    });
  }

  deleteUser(user: User){
    console.log(user.id);
    this.userService.deleteUser(user.id)
    .subscribe(data =>{
      this.getUsers();
    });
  }

  async editName(user: User){
    const alerta = await this.alertController.create({
      header:'Editar correo',
      inputs: [
        {
          type: 'text',
          name: 'email',
          placeholder: 'Ingresar nombre del correo',
          value: user.email
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Editar',
          handler: (data: any)=>{
            const isValid: boolean = this.validInput(data);
            const email = data.email;
            user.email = email;
            console.log('----');
            console.log(data);
            if (isValid){
              console.log(user.email);
              this.userService.editUser(user.id, data).subscribe(data2=>{
                console.log(data2);
                // eslint-disable-next-line eqeqeq
                if (data2.message == 'Success'){
                  this.presentToast('Lista editada correctamente');
                }else{
                  this.presentToast('Usuario ya registrado');
                  this.getUsers();
                }
              });
              }
            else{
              this.getUsers();
            }
          }
        }
      ]
    });
    await alerta.present();
    console.log('click en el boton');
  }

  validInput(input: any): boolean{
    if (input && input.email){
      return true;
    }
    this.presentToast('Debe ingresar un valor');
    return false;
  }

  async presentToast(mensaje: string){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

}
