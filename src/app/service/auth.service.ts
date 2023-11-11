import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, delay } from 'rxjs';
import { UserLogged } from './../models/UserLogged';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token: string = "";
  //Observador cargando
  private cargando: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public $cargando = this.cargando.asObservable();
  //Observador del UserLogged
  private usuarioActivo: BehaviorSubject<UserLogged | null> = new BehaviorSubject<UserLogged | null>(null);
  public $usuarioActivo = this.usuarioActivo.asObservable();
  private readonly URL_LOGIN = 'https://dummyjson.com/auth/login';
  constructor(
    private router: Router,
    private http: HttpClient
  ) { 
    
   }

    public tryLogin(username: string, password: string){
      this.cargando.next(true);
      this.http.post<UserLogged>(this.URL_LOGIN, JSON.stringify({
        username: username,
        password: password
      }), 
      {
        headers: {
          "Content-Type":"application/json"
        }
      }
      )
      .pipe(delay(2000))
      .subscribe( resultado => {
        this.usuarioActivo.next(resultado);
        this.cargando.next(false);
        this.router.navigate(['/profile']);
        this.token = resultado.token;
        //localStorage.setItem('token', resultado.token);    
      });
    }
  }
