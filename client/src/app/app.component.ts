import { Component } from '@angular/core';
import { LanguageService } from './utils/language.service';
import Parse from 'parse';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private languageCtrl: LanguageService) {
    languageCtrl.getDefaultLanguage();
    Parse.initialize("9rjbqhVrs0VggxsF9DgCywTr2bL6WtWmWaROtxKU");
    Parse.serverURL = 'https://banlist-production.up.railway.app/parse';

  }
}
