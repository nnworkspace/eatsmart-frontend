import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

export interface AlertData {
  message: string;
}


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  // message: string;
  // @Output() close = new EventEmitter<void>();

  constructor(
    public alertRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AlertData) {
    console.log('from AlertComponent constructor: data: ' + data.message );
  }

  ngOnInit() {
  }

  // onClose() {
  //   this.close.emit();
  // }

  onCloseClick(): void {
    this.alertRef.close();
  }
}
