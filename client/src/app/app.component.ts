import { Component } from '@angular/core';
import { LanguageService } from './utils/language.service';
import Parse from 'parse';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private languageCtrl: LanguageService) {
    languageCtrl.getDefaultLanguage();
    Parse.initialize(environment.appid);
    Parse.serverURL = environment.host;

  }
}
