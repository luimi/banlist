import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-report-item',
  templateUrl: './report-item.component.html',
  styleUrls: ['./report-item.component.scss'],
})
export class ReportItemComponent implements OnInit {
  @Input() report;
  moment = moment;
  constructor() { }

  ngOnInit() {}

}
