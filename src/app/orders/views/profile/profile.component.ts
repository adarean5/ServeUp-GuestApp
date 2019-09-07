import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Input() user;
  @Output() emSignOut = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log('[ProfileComponent] Started');
    console.log('[ProfileComponent] User ', this.user);
  }

  signOut() {
    this.emSignOut.emit();
  }
}
