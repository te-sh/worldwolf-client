import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatDialogModule,
  MatFormFieldModule, MatIconModule, MatInputModule,
  MatListModule, MatTableModule, MatToolbarModule
} from '@angular/material';

const modules = [
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatTableModule,
  MatToolbarModule
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class AppMatModule { }
