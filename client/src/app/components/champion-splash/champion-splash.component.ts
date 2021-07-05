import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-champion-splash',
  templateUrl: './champion-splash.component.html',
  styleUrls: ['./champion-splash.component.scss'],
})
export class ChampionSplashComponent implements OnInit {
  @Input() name;
  constructor() { }

  ngOnInit() {
    console.log(this.name);
  }

}
