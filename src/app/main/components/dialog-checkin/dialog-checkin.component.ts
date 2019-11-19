import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Meal} from '../../../store/models/meal.model';
import {ZXingScannerComponent} from '@zxing/ngx-scanner';
import {BehaviorSubject} from 'rxjs';
import {last} from 'rxjs/operators';

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

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      restaurantName: string;
      restaurantId: number;
      items: Meal[];
    },
    public dialogRef: MatDialogRef<DialogCheckinComponent>
  ) { }

  ngOnInit() {
    this.displayScanner = false;
  }

  openScanner() {
    this.displayScanner = true;
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    console.log('Cameras found:', devices);
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onScanError(err: any) {
    this.qrResultString = null;
    console.log('Scan error', err);
  }

  onScanSuccess(resultString: string) {
    console.log('Scan success', resultString);
    this.qrResultString = resultString;
    this.failedCounter = 0;
  }

  onDeviceSelectChange(selected: string) {
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || null;
  }

  onHasPermission(permission: boolean) {
    console.log('Has permisson', permission);
    this.hasPermission = permission;
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }
}
