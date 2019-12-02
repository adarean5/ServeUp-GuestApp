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
  currentDeviceIndex: number = null;

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
    this.currentDeviceIndex = null;
    this.currentDevice = null;
    this.availableDevices = null;
    this.hasDevices = undefined;
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

  onDeviceSelectChange(event: any) {
    console.log('Event', event);
    if (event) {
      const selected = event.deviceId;
      this.currentDeviceIndex = this.availableDevices.findIndex(x => x.deviceId === selected);
      this.currentDevice = this.availableDevices[this.currentDeviceIndex] || null;
    }
  }

  toggleDevice() {
    if (this.availableDevices && this.availableDevices.length > 0) {
      this.currentDeviceIndex = (this.currentDeviceIndex + 1) % this.availableDevices.length;
      this.currentDevice = this.availableDevices[this.currentDeviceIndex] || null;
    }
  }

  onHasPermission(permission: boolean) {
    this.hasPermission = permission;
  }
}
