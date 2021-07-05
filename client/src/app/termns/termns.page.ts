import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ValidateService } from '../utils/validate.service';

@Component({
  selector: 'app-termns',
  templateUrl: './termns.page.html',
  styleUrls: ['./termns.page.scss'],
})
export class TermnsPage implements OnInit {
  accepted = false;
  constructor(private navCtrl: NavController, private validate: ValidateService) { 
    
  }

  ngOnInit() {
    this.validate.currentStatus("summoner");
  }
  continue(){
    localStorage.setItem("termns","true");
    this.navCtrl.navigateForward("server");
  }
}
