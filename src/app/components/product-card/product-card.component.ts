import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product = new Product();

  @Output() deleted: EventEmitter<any> = new EventEmitter();

  constructor(public ps: ProductsService) {
  }

  ngOnInit(): void {
  }

  delete()
  {
    this.deleted.emit({id: this.product.id});
  }

}
