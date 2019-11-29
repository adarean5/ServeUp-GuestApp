import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent implements OnInit {
  @Input() icon: string;
  @Input() text: string;
  @Input() iconHeight?: string;
  @Input() iconWidth?: string;
  @Input() matStyle = '';
  @Input() palette = '';

  buttonClass: string;

  constructor() { }

  ngOnInit() {
    this.buttonClass = 'mat-' + this.matStyle + (this.matStyle ? '-' : '') + 'button';
  }
}
