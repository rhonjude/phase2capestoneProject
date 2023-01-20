import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AddtocartComponent } from './addtocart/addtocart.component';
import { CheckoutComponent } from './addtocart/checkout.component';
import { ContactusComponent } from './contactus/contactus.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './home/menu.component';
import { ShellComponent } from './home/shell.component';
import { AuthGuardUser } from './login/auth-guard-user.service';
import { AuthGuard } from './login/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { ProductsComponent } from './products/products.component';
import { ProductviewComponent } from './productview/productview.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path:'',component:MenuComponent,
children:[{path:'',component:WelcomeComponent},
{path:'home',component:HomeComponent},
{path:'prodlist',loadChildren:()=>import('../app/productlist/productlist.module').then(m=>m.ProductlistModule)},
{path:'addtocart',component:AddtocartComponent,canActivate: [AuthGuardUser]},
{path:'prodview',component:ProductviewComponent,loadChildren:()=>import('../app/productview/productview.module').then(m=>m.ProductviewModule),canActivate: [AuthGuardUser]},
{path:'aboutus',component:AboutusComponent},
{path:'contactus',component:ContactusComponent},
{path:'product',loadChildren:()=>import('../app/products/product.module').then(m=>m.ProductModule),canActivate:[AuthGuard]}

]},

{path:'login',component:LoginComponent},
{path:'checkout',component:CheckoutComponent,canActivate:[AuthGuardUser]},
{path:'**',component:PagenotfoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
