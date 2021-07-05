import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TranslateModule } from '@ngx-translate/core';
import { ProfileDialogComponent } from './profile-dialog/profile-dialog.component';
import { AveragesComponent } from './averages/averages.component';
import { ReportItemComponent } from './report-item/report-item.component';
import { ReportDialogComponent } from './report-dialog/report-dialog.component';
import { ChampionSplashComponent } from './champion-splash/champion-splash.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule
  ],
  declarations: [ProfileDialogComponent, AveragesComponent, ReportItemComponent, ReportDialogComponent, ChampionSplashComponent],
  exports: [ProfileDialogComponent, AveragesComponent, ReportItemComponent, ReportDialogComponent, ChampionSplashComponent]
})
export class ComponentsModule {}
