import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServerPageRoutingModule } from './server-routing.module';

import { ServerPage } from './server.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServerPageRoutingModule,
    TranslateModule
  ],
  declarations: [ServerPage]
})
export class ServerPageModule {}
