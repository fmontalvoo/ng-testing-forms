import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';

import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';


@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule
  ],
  declarations: [
    ProductComponent,
    ProductsComponent,
    ProductDetailComponent,
  ],
})
export class ProductsModule { }
