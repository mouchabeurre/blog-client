import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfilemanagerService } from '../../services/profilemanager.service';
import { GrowlmanagerService } from '../../services/growlmanager.service';
import { AuthService } from '../../services/auth.service';
import { SELFUSER, USER } from '../../models/user';
import { TruncatePipe } from '../../pipes/truncate.pipe'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: USER | SELFUSER;
  selfProfile: boolean = false;

  constructor(
    private authService: AuthService,
    private profileManager: ProfilemanagerService,
    private activatedRoute: ActivatedRoute,
    private growlmanagerService: GrowlmanagerService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params['username']) {
        this.profileManager.getProfile(params['username']).subscribe(res => {
          if (res.success) {
            this.user = res.profile;
          } else {
            this.growlmanagerService.generateGrowl({ success: false, msg: res.msg, feedback: 3 })
          }
        });
      } else {
        this.selfProfile = true;
        this.profileManager.getOwnProfile().subscribe(res => {
          if (res.success) {
            this.user = res.profile;
            console.log(this.user);
          } else {
            this.growlmanagerService.generateGrowl({ success: false, msg: res.msg, feedback: 3 })
          }
        });
      }
    });
  }

}
