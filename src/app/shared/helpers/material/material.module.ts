import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

const materialModules = [
  CommonModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatInputModule,
  FormsModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule
];

@NgModule({
  imports: [
    materialModules
  ],
  exports: [
    materialModules
  ],
})
export class MaterialModule {}
