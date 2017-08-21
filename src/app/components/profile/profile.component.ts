import { Component, OnInit } from '@angular/core';
import { ProfilemanagerService } from '../../services/profilemanager.service';
import { SELFUSER } from '../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  selfuser: SELFUSER = null;

  constructor(private profileManager: ProfilemanagerService) { }

  ngOnInit() {
    this.profileManager.getProfile().then(profile => {
      this.selfuser = profile;
    },
      err => {
        console.log(err);
        return false;
      });
  }

}
