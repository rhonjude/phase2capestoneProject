import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductaddComponent } from '../productadd/productadd.component';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  {path:'',component:ProductsComponent,
children:[{path:'addprod',component:ProductaddComponent}]}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
