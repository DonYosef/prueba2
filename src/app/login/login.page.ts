import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public formularioLogin: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public auth: AuthService
  ) { 
    this.formularioLogin = this.formBuilder.group({
      username: ['', 
                  [Validators.required,
                     Validators.minLength(3), 
                     Validators.maxLength(10)]],
      password: ['', 
                  [ Validators.required, 
                      Validators.minLength(3), 
                      Validators.maxLength(10)]]
    });
   }

   public tryLogin(){
      if(!this.formularioLogin.valid){
        alert("Form invalido");
        this.formularioLogin.controls['username'].setValue("");
        this.formularioLogin.controls['password'].setValue("");
        this.formularioLogin.clearValidators();
        return
      }
      this.auth.tryLogin(
        this.formularioLogin.controls['username'].value,
        this.formularioLogin.controls['password'].value
      );
   }

  ngOnInit() {
  }

}
