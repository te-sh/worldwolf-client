import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatDialogModule,
  MatFormFieldModule, MatIconModule, MatInputModule,
  MatListModule, MatSelectModule, MatTableModule,
  MatToolbarModule,
  MAT_DIALOG_DEFAULT_OPTIONS
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
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
  ]
})
export class AppMatModule { }
