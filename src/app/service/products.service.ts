import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, AnswerProduct } from './../models/Products';
import { LoadingController } from '@ionic/angular';
import { delay } from 'rxjs';
import { AuthService } from './../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly URL_PRODUCTO = "https://dummyjson.com/auth/products?skip="
  public products: Product[] = [];
  private skip = 0; //limite skip establecido en 30 segundo lo requerido
  private limite = 30;
  constructor(
    private http: HttpClient,
    private loading: LoadingController,
    public auth: AuthService
  ) { }

  public async consultarProductos(){
    const control = await this.loading.create({
      message: "Cargando productos..."
    });
    control.present();
    this.http.get<AnswerProduct>(`${this.URL_PRODUCTO}${this.skip}`,{
      headers: {
        'Authorization': 'Bearer ' + this.auth.token, //localStorage.getItem('token'), 
        'Content-Type': 'application/json'
      }
    })
    .pipe(delay(1000))
    .subscribe( res => {
      control.dismiss();
      this.skip = this.skip + res.limit;
      this.limite = res.limit;
      this.products = [];
      this.products = this.products.concat(res.products);
    });
  }

}
