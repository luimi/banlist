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
import { ProfileIconComponent } from './profile-icon/profile-icon.component';
import { ChampionIconComponent } from './champion-icon/champion-icon.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule
  ],
  declarations: [ProfileDialogComponent, AveragesComponent, ReportItemComponent, ReportDialogComponent, ChampionSplashComponent, ProfileIconComponent, ChampionIconComponent],
  exports: [ProfileDialogComponent, AveragesComponent, ReportItemComponent, ReportDialogComponent, ChampionSplashComponent, ProfileIconComponent, ChampionIconComponent]
})
export class ComponentsModule {}
