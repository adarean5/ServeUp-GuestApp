import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-list-layout',
  templateUrl: './list-layout.component.html',
  styleUrls: ['./list-layout.component.scss']
})
export class ListLayoutComponent implements OnInit {
  @Input() displayHeader = true;

  constructor() { }

  ngOnInit() {
  }

}
