import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductviewComponent } from "./productview.component";

const routes: Routes = [
    {path:'',component:ProductviewComponent}
    
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProductRoutingModule { }