import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatDialogModule,
  MatFormFieldModule, MatIconModule, MatInputModule,
  MatListModule, MatSelectModule, MatTableModule,
  MatToolbarModule
} from '@angular/material';

const modules = [
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatTableModule,
  MatToolbarModule
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class AppMatModule { }
