import { Component, Input, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import Parse from 'parse';
import { UtilsService } from 'src/app/utils/utils.service';
@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.scss'],
})
export class ReportDialogComponent implements OnInit {
  @Input() player;
  @Input() game;
  report: any = { note: "", pro: false, nice: false, feeder: false, flamer: false, leaver: false, troll: false };
  constructor(private loadingCtrl: LoadingController, private alertCtrl: AlertController, private translate: TranslateService, private modalCtrl: ModalController, private utils: UtilsService) { }

  ngOnInit() {
    let summoner: any = JSON.parse(localStorage.getItem("summoner"));
    this.report.from = summoner.objectId;
    this.report.to = this.player.summoner.id;
    this.report.game = this.game + "";
    this.report.champion = this.player.champion.id;
  }

  async send() {
    const loading = await this.loadingCtrl.create({ cssClass: "loading", spinner: "circles" });
    await loading.present();
    this.utils.cloudCode("report", this.report, ["general.errors.params", "report.errors.self", "report.errors.notfound","report.errors.duplicated"], async (data) => {
      loading.dismiss();
      let textOk = await this.getText("general.ok");
      const alert = await this.alertCtrl.create({
        cssClass: 'alert',
        message: await this.getText("report.success"),
        buttons: [{
          text: textOk, handler: () => {
            this.close();
          }
        }]
      });

      await alert.present();
    }, () => { 
      loading.dismiss();
    });
  }
  async getText(path) {
    return await this.translate.get(path).toPromise();
  }
  close() {
    this.modalCtrl.dismiss();
  }
}
