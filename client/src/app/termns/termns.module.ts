import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermnsPageRoutingModule } from './termns-routing.module';

import { TermnsPage } from './termns.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermnsPageRoutingModule,
    TranslateModule
  ],
  declarations: [TermnsPage]
})
export class TermnsPageModule {}
