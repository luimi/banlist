import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor(private navCtrl: NavController) { }

  public currentStatus(current) {
    let server = localStorage.getItem("server");
    let accepted = localStorage.getItem("termns");
    let summoner = localStorage.getItem("summoner");
    let page;
    if (!accepted) {
      page = "";
    } else if (!server) {
      page = "server";
    } else if (!summoner) {
      page = "summoner";
    } else if (accepted && server && summoner) {
      page = "main"
    }
    if (current !== page) {
      this.navCtrl.navigateForward(page);
    }
  }

  
}
