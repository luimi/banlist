import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import Parse from 'parse';
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor( private alertCtrl: AlertController, private translate: TranslateService) { }

  public async cloudCode(func, data, errors, success, error) {
    let response = await Parse.Cloud.run(func, data);
    if (response.success) {
      success(response.data);
    } else {
      error();
      let ok = await this.translate.get("general.ok").toPromise();
      let title = await this.translate.get("general.error").toPromise();
      let message = await this.translate.get(errors[response.error]).toPromise();
      const alert = await this.alertCtrl.create({
        cssClass: 'alert',
        header: title,
        message: message,
        buttons: [ok]
      });

      await alert.present();
    }
  }
}
