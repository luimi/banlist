import { Component } from '@angular/core';
import { ValidateService } from '../utils/validate.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private validate: ValidateService) {}

  async ngOnInit() {
    this.validate.currentStatus("main");
  }

}
