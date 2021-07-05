import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import Parse from 'parse';
import { ValidateService } from '../utils/validate.service';
@Component({
  selector: 'app-server',
  templateUrl: './server.page.html',
  styleUrls: ['./server.page.scss'],
})
export class ServerPage implements OnInit {
  servers = [];
  constructor(private navCtrl: NavController, private validate: ValidateService) { }

  async ngOnInit() {
    this.validate.currentStatus("summoner");
    this.servers = await new Parse.Query("Server").ascending("name").find();
  }
  next(server){
    localStorage.setItem("server", server.id);
    this.navCtrl.navigateForward("summoner");
  }
}
