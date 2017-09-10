import { Component, OnInit } from '@angular/core';
import { BootstrapGrowlService, BootstrapAlertType } from "ngx-bootstrap-growl";
import { GrowlmanagerService } from '../../services/growlmanager.service';

@Component({
  selector: 'app-growler',
  templateUrl: './growler.component.html',
  styleUrls: ['./growler.component.css']
})
export class GrowlerComponent implements OnInit {

  constructor(
    private bootstrapGrowlService: BootstrapGrowlService,
    private growlmanagerService: GrowlmanagerService
  ) { }

  ngOnInit() {
    this.growlmanagerService.growls.subscribe(data => {
      this.addGrowlAlert(data.msg, data.success, data.feedback);
    });
  }

  addGrowlAlert(message: string, type: boolean, feedback: number) {
    let bootstrap_style;
    switch (feedback) {
      case 0:
        bootstrap_style = BootstrapAlertType.SUCCESS;
        break;
      case 1:
        bootstrap_style = BootstrapAlertType.INFO;
        break;
      case 2:
        bootstrap_style = BootstrapAlertType.WARNING;
        break;
      case 3:
        bootstrap_style = BootstrapAlertType.DANGER;
        break;
      default:
        if (type) {
          bootstrap_style = BootstrapAlertType.SUCCESS;
        }
        else {
          bootstrap_style = BootstrapAlertType.DANGER;
        }
        break;
    }

    this.bootstrapGrowlService.addAlert(message, bootstrap_style);
  }

}
