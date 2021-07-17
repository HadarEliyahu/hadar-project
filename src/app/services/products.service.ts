import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products: Array<Product> = [];
  private productsObvserver: BehaviorSubject<Array<Product>> = new BehaviorSubject<Array<Product>>(this.products);

  constructor() {
    let storage = localStorage.getItem('products');
    if(storage != null)
    {
      this.products = JSON.parse(storage.toString())
      this.productsObvserver.next(this.products);
    }
  }

  updateStorage()
  {
    this.productsObvserver.subscribe(() => {
      localStorage.setItem('products', JSON.stringify(this.products));
    })
  }

  getAll()
  {
    return this.productsObvserver.asObservable();
  }

  get(id: number)
  {
    return this.products.find((o => { return o.id == id }))
  }

  add(product: Product)
  {
    debugger
    product.id = (Math.max.apply(Math, this.products.map(function(o) { return o.id; })) + 1) | 1
    this.products.push(product)
    this.productsObvserver.next(this.products);
    this.updateStorage()
    return true;
  }

  delete(id: Number)
  {
    this.products = this.products.filter(function( obj ) {
      return obj.id !== id;
    });

    this.productsObvserver.next(this.products);
    this.updateStorage()
  }

  save(product: Product)
  {
    if(product.id != 0)
    {
      let index = this.products.findIndex((o) => {return o.id == product.id})

      if(index != -1)
      {
        this.products[index] = product;
        this.updateStorage()
        return true;
      }
    }
    else
    {
      return this.add(product)
    }
    return false;
  }
}
