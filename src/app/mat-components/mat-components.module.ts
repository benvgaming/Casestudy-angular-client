import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// added imports
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {MatCheckboxModule } from '@angular/material/checkbox'
import { MatExpansionModule } from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog'
const MaterialComponents = [MatButtonModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatListModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTooltipModule,
  MatTableModule,
  MatSortModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatDialogModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...MaterialComponents
  ],
  exports: [...MaterialComponents],
})
export class MatComponentsModule { }
