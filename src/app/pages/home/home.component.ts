import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public ps: ProductsService, private router: ActivatedRoute) { }

  public products: Array<Product> = [];

  public filtered: Array<Product> = [];

  public filter: string = "";

  public currentEdit: any = null;

  ngOnInit(): void {
    this.ps.getAll().subscribe((products) => {
      this.products = products;
      this.filtered = this.products;
    });

    this.router.params.subscribe((params) => {
      this.currentEdit = this.ps.get(params['id']);

  });
  }

  addNew()
  {
    this.currentEdit = new Product();
  }

  delete(id: number)
  {
    this.ps.delete(id);
  }

  edit(product: Product)
  {
    this.currentEdit = product;
  }

  filterProducts()
  {
      if(this.filter != "")
        this.filtered = this.products.filter((o) => {return o.Name.includes(this.filter) || o.Description.includes(this.filter)})
      else this.filtered = this.products
  }

}
