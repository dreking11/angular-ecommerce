import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListsComponent } from './components/product-lists/product-lists.component';
import {HttpClientModule} from '@angular/common/http';
import { ProductService } from './services/product.service';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'category/:id', component: ProductListsComponent},
  {path: 'category', component: ProductListsComponent},
  {path: 'products', component: ProductListsComponent},
  {path: '', redirectTo: '/products',pathMatch: 'full'},
  {path: '**', redirectTo: '/products',pathMatch: 'full'}
];
@NgModule({
  declarations: [
    AppComponent,
    ProductListsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
