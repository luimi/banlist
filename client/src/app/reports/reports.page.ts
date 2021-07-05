import { Component, OnInit } from '@angular/core';
import Parse from 'parse';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {
  reports = [];
  constructor() { }
  ngOnInit(){}
  async ionViewDidEnter() {
    this.reports = [];
    let summoner = JSON.parse(localStorage.getItem("summoner"));
    let Summoner = Parse.Object.extend("Summoner");
    let user = new Summoner();
    user.id = summoner.objectId;
    this.reports = await new Parse.Query("Report").equalTo("to", user).include("champion").find();
  }

}
