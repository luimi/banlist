import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalculateService } from 'src/app/utils/calculate.service';
import Parse from 'parse';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss'],
})
export class ProfileDialogComponent implements OnInit {
  @Input() player;
  reports;
  averages;
  reportsFrom = "all";
  constructor(private calculate: CalculateService, private modalCtrl: ModalController) { }

  async ngOnInit() {
    let obj = JSON.parse(JSON.stringify(this.player.summoner));
    this.averages = this.calculate.getAverages(obj);
    this.getReports();
  }
  async getReports(){
    let query = new Parse.Query("Report").equalTo("to",this.player.summoner).include("champion");
    if(this.reportsFrom === "me"){
      let summoner = JSON.parse(localStorage.getItem("summoner"));
      let Summoner = Parse.Object.extend("Summoner");
      let user = new Summoner();
      user.id = summoner.objectId;
      query.equalTo("from",user);
    }
    this.reports = await query.find();
  }
  dismiss(){
    this.modalCtrl.dismiss();
  }
}
