import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string,className:string) {     
    this.snackBar.open(message, action, {
      duration: 1500,
      verticalPosition :'top',
      horizontalPosition:'right',
      panelClass:[className]
    });
  }
}
