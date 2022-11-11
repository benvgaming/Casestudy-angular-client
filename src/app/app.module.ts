import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// added imports
import { MatComponentsModule } from './mat-components/mat-components.module';
import { HomeComponent } from './home/home.component';
import { VendorModule } from './vendor/vendor.module';
import { ProductModule } from './product/product.module';
import { PurchaseorderModule } from './purchaseorder/purchaseorder.module';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
//import { VendorDetailComponent } from './vendor/vendor-detail/vendor-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DeleteDialogComponent,
//    VendorDetailComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatComponentsModule,
    HttpClientModule,
    VendorModule,
    ProductModule,
    PurchaseorderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
