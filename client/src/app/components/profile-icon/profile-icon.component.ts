import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-icon',
  templateUrl: './profile-icon.component.html',
  styleUrls: ['./profile-icon.component.scss'],
})
export class ProfileIconComponent implements OnInit {
  @Input() icon;
  @Input() isProfile = false;
  constructor() { }

  ngOnInit() {}

}
