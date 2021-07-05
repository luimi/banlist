import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import Parse from 'parse';
import { UtilsService } from '../utils/utils.service';
import { ValidateService } from '../utils/validate.service';
@Component({
  selector: 'app-summoner',
  templateUrl: './summoner.page.html',
  styleUrls: ['./summoner.page.scss'],
})
export class SummonerPage implements OnInit {
  summoner;
  constructor(private loadingCtrl: LoadingController, private navCtrl: NavController, private validate: ValidateService, private utils: UtilsService) { }

  ngOnInit() {
    this.validate.currentStatus("summoner");
  }
  async search(){
    const loading = await this.loadingCtrl.create({cssClass:"loading", spinner:"circles"});
    await loading.present();
    let server = localStorage.getItem("server");
    this.utils.cloudCode("getSummoner",{server: server, summoner:this.summoner},["general.errors.params","summoner.error2","summoner.error3"],(data) => {
      loading.dismiss();
      localStorage.setItem("summoner",JSON.stringify(data));
      this.navCtrl.navigateForward("main");
    }, ()=> {
      loading.dismiss();
    });
  }
}
