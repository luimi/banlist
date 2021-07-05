import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { UtilsService } from '../utils/utils.service';
import { ValidateService } from '../utils/validate.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  flag = "IRON";
  ranks = {
    IRON:1,
    BRONCE:2,
    SILVER:3,
    GOLD:4,
    PLATINUM:5,
    DIAMOND:6,
    MASTER:7,
    GRANDMASTER:8,
    CHALLENGER:9
  }
  summoner;
  constructor(private validate: ValidateService, private utils: UtilsService, private loadingCtrl: LoadingController) { }
  ngOnInit(){}
  ionViewDidEnter() {
    let summoner = JSON.parse(localStorage.getItem("summoner"));
    if(summoner.rankSolo && summoner.rank5x5){
      this.flag = this.ranks[summoner.rankSolo]>=this.ranks[summoner.rank5x5]?summoner.rankSolo:summoner.rank5x5;
    } else if(summoner.rankSolo) {
      this.flag = summoner.rankSolo;
    } else if(summoner.rank5x5) {
      this.flag = summoner.rank5x5;
    }
    this.summoner = summoner;
  }
  async update(){
    const loading = await this.loadingCtrl.create({cssClass:"loading", spinner:"circles"});
    await loading.present();
    this.utils.cloudCode("updateSummoner",{summoner: this.summoner.objectId},["general.errors.params","summoner.error2","summoner.error3"], (data) => {
      localStorage.setItem("summoner",JSON.stringify(data));
      this.ngOnInit();
      loading.dismiss();
    }, () => {
      loading.dismiss();
    });
  }
  change(){
    localStorage.clear();
    localStorage.setItem("termns","true");
    this.validate.currentStatus("summoner");
  }
}
