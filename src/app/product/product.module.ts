import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatComponentsModule } from '@app/mat-components/mat-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductHomeComponent } from './product-home/product-home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import {MatExpansionModule} from '@angular/material/expansion'

@NgModule({
  declarations: [
    ProductHomeComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    MatComponentsModule,
    ReactiveFormsModule,
    MatExpansionModule,
  ]
})
export class ProductModule { }
