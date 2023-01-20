import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { productReducer } from '../state/productsngrx/productsngrx.reducer';
import { ProductEffects } from '../state/productsngrx/productsngrx.effects';
import { EffectsModule } from '@ngrx/effects';
import { ProductsComponent } from './products.component';
import { MatTableModule } from '@angular/material/table';
import { ProductaddComponent } from '../productadd/productadd.component';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductaddComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    StoreModule.forFeature('products',productReducer),
    EffectsModule.forFeature([ProductEffects])

  ]
})
export class ProductModule { }
