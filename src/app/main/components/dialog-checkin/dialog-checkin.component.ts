import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Meal} from '../../../store/models/meal.model';

@Component({
  selector: 'app-dialog-checkin',
  templateUrl: './dialog-checkin.component.html',
  styleUrls: ['./dialog-checkin.component.scss']
})
export class DialogCheckinComponent implements OnInit {
  displayScanner = false;
  failedCounter = 0;

  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;

  hasDevices: boolean;
  hasPermission: boolean;

  qrResultString: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      restaurantName: string;
      orderId: number;
      items: Meal[];
      checkedIn: boolean;
    },
    public dialogRef: MatDialogRef<DialogCheckinComponent>
  ) { }

  ngOnInit() {
    this.displayScanner = false;
  }

  openScanner() {
    this.displayScanner = true;
  }

  closeScanner() {
    this.displayScanner = false;
    this.qrResultString = null;
  }

  submitQrCode() {
    this.dialogRef.close({
      orderId: this.data.orderId,
      qrResultString: this.qrResultString
    });
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onScanError(err: any) {
    this.qrResultString = null;
  }

  onScanSuccess(resultString: string) {
    this.qrResultString = resultString;
    this.failedCounter = 0;
  }

  onDeviceSelectChange(selected: string) {
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || null;
  }

  onHasPermission(permission: boolean) {
    this.hasPermission = permission;
  }
}
