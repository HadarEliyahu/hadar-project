import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss']
})
export class ProductEditorComponent implements OnInit {

  @Input() product: Product = new Product();

  @Output() close: EventEmitter<any> = new EventEmitter();

  public productForm = this.fb.group({
    id: [''],
    Name: ['', [Validators.required, Validators.maxLength(30)]],
    Description: ['', [Validators.maxLength(200)]],
    Price: ['', [Validators.required, Validators.min(1)]],
    CreationDate: ['', Validators.required],
  });

  constructor(public fb: FormBuilder, public ps: ProductsService) { }

  ngOnInit(): void {
    if(this.product != null)
    {
      this.productForm.patchValue(this.product);
      this.productForm.controls["CreationDate"].setValue(this.product.CreationDate.toString())
    }



  }

  ngOnChanges(changes: SimpleChanges)
  {
    this.product = changes.product.currentValue;
    this.productForm.patchValue(this.product);
    this.productForm.controls["CreationDate"].setValue(this.product.CreationDate.toString())
  }

  save()
  {
    if(this.productForm.valid)
    {
      if(this.ps.save(this.productForm.value) == true)
      {
        this.close.emit();
      }
    }
  }

  cancel()
  {
    this.close.emit();
  }

}
