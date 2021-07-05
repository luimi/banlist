import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-champion-icon',
  templateUrl: './champion-icon.component.html',
  styleUrls: ['./champion-icon.component.scss'],
})
export class ChampionIconComponent implements OnInit {
  @Input() name;
  constructor() { }

  ngOnInit() {}

}
