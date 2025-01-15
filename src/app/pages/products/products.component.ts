import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private api: ApiService) { }
  products: any;
  ngOnInit() {
    this.initProducts();
  }

  initProducts() {
    this.api.getAllProducts().subscribe((data: any) => {
      console.log('a',data)
      this.products = data.items;
    })
  }
}
