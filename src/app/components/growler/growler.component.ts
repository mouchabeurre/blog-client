import { Component, OnInit } from '@angular/core';
import { BootstrapGrowlService, BootstrapAlertType } from "ngx-bootstrap-growl";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-growler',
  templateUrl: './growler.component.html',
  styleUrls: ['./growler.component.css']
})
export class GrowlerComponent implements OnInit {

  constructor(
    private bootstrapGrowlService: BootstrapGrowlService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.growls.subscribe(data => {
      this.addGrowlAlert(data.msg, data.success);
    });
  }

  addGrowlAlert(message: string, type: boolean) {
    let bootstrap_style;
    if (type) {
      bootstrap_style = BootstrapAlertType.SUCCESS;
    }
    else {
      bootstrap_style = BootstrapAlertType.DANGER;
    }
    this.bootstrapGrowlService.addAlert(message, bootstrap_style);
  }

}
