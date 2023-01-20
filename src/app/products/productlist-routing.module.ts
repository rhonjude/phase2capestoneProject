import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductlistComponent } from "../productlist/productlist.component";

const routes:Routes=[
    {path:'',component:ProductlistComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class ProductlistRoutingModule { }