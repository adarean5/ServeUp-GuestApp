import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
  @Input() iconName: string;
  @Input() width?: string;
  @Input() height?: string;

  private defaultWidth = '24px';
  private defaultHeight = '24px';

  actualWidth: string;
  actualHeight: string;

  constructor() { }

  ngOnInit() {
    if (this.height) {
      this.actualHeight = this.height;
    } else if (this.width) {
      // noinspection JSSuspiciousNameCombination
      this.actualHeight = this.width;
    } else {
      this.actualHeight = this.defaultHeight;
    }

    if (this.width) {
      this.actualWidth = this.width;
    } else if (this.height) {
      // noinspection JSSuspiciousNameCombination
      this.actualWidth = this.height;
    } else {
      this.actualWidth = this.defaultWidth;
    }
  }

}
