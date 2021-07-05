import { Component, Input, OnInit } from '@angular/core';
import { CalculateService } from 'src/app/utils/calculate.service';

@Component({
  selector: 'app-averages',
  templateUrl: './averages.component.html',
  styleUrls: ['./averages.component.scss'],
})
export class AveragesComponent implements OnInit {
  @Input() averages;
  constructor(private calculate: CalculateService) { }

  ngOnInit() {
  }

}
