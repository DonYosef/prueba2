import { Component, OnInit } from '@angular/core';
import { UserLogged } from './../models/UserLogged';
import { AuthService } from './../service/auth.service';
import  { ViewDidLeave, ViewWillEnter } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements ViewDidLeave, ViewWillEnter {

  public usuarioActivo: UserLogged | null = null;
  private suscripcion: Subscription | null = null;
  
  constructor(
    private auth: AuthService
  ) { }
  ionViewDidLeave(): void {
    this.suscripcion?.unsubscribe();
  }
  ionViewWillEnter(): void {
    this.auth.$usuarioActivo.subscribe( usuario => {
      this.usuarioActivo = usuario;
    });
  }

}
