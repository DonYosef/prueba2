import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../service/products.service';
import { ViewDidEnter } from '@ionic/angular';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements ViewDidEnter {

  constructor(
    public proSer: ProductsService
  ) { }

  ionViewDidEnter(): void {
    this.proSer.consultarProductos();
  }


}
