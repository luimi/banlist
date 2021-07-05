import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import Parse from 'parse';
import { ProfileDialogComponent } from '../components/profile-dialog/profile-dialog.component';
import { CalculateService } from '../utils/calculate.service';
import { UtilsService } from '../utils/utils.service';
@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  summoner;
  game;
  constructor(private utils: UtilsService) { }

  ngOnInit() {
    this.summoner = JSON.parse(localStorage.getItem("summoner"));
    this.getCurrentMatch();
  }
  async getCurrentMatch(){
    this.utils.cloudCode("getCurrentGame",{summoner:this.summoner.objectId},["general.errors.params","game.error2","game.error3"],(data) => {
      this.game = data;
    }, ()=> {});
  }
}
