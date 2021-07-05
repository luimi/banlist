import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProfileDialogComponent } from '../profile-dialog/profile-dialog.component';
import { ReportDialogComponent } from '../report-dialog/report-dialog.component';

@Component({
  selector: 'app-profile-short',
  templateUrl: './profile-short.component.html',
  styleUrls: ['./profile-short.component.scss'],
})
export class ProfileShortComponent implements OnInit {
  @Input() player;
  @Input() game;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}
  async openPlayer(){
    const modal = await this.modalCtrl.create({
      component: ProfileDialogComponent,
      componentProps: {player:this.player}
    });
    return await modal.present();
  }
  async report(){
    const modal = await this.modalCtrl.create({
      component: ReportDialogComponent,
      componentProps: {player:this.player, game:this.game }
    });
    return await modal.present();
  }
}
