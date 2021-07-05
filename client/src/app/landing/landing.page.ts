import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import Parse from 'parse';
import { CalculateService } from '../utils/calculate.service';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  summoner;
  averages;
  
  constructor(private calculate: CalculateService, private navCtrl: NavController) { }
  ngOnInit(){}
  async ionViewDidEnter() {
    this.summoner = JSON.parse(localStorage.getItem("summoner"));
    try{
      let updated = await new Parse.Query('Summoner').include("main").include("server").get(this.summoner.objectId);
      localStorage.setItem("summoner",JSON.stringify(updated));
      this.summoner = JSON.parse(localStorage.getItem("summoner"));
    }catch(e){}
    this.averages = this.calculate.getAverages(this.summoner);
  }
  getCurrentMatch(){
    this.navCtrl.navigateForward("game");
  }
}
