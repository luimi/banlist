import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SummonerPageRoutingModule } from './summoner-routing.module';

import { SummonerPage } from './summoner.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SummonerPageRoutingModule,
    TranslateModule
  ],
  declarations: [SummonerPage]
})
export class SummonerPageModule {}
