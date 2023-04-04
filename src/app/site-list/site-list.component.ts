import { Component } from '@angular/core';
import { PasswordManagerService } from '../password-manager.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css'],
})
export class SiteListComponent {
  allSites!: Observable<Array<any>>;

  siteName!: string;
  siteURL!: string;
  siteImageUrl!: string;
  siteId!: string;

  formState: string = 'Add New';

  constructor(private passwordManagerService: PasswordManagerService) {
    this.loadSites();
  }
  onSubmit(values: object) {
    if (this.formState == 'Add New') {
      this.passwordManagerService
        .addSite(values)
        .then(() => {
          console.log('Data save Successfully');
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (this.formState == 'Edit') {
      this.passwordManagerService
        .updateSite(this.siteId, values)
        .then(() => {
          console.log('Data Updated');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  loadSites() {
    this.allSites = this.passwordManagerService.loadSites();
  }

  editSite(
    siteName: string,
    siteURL: string,
    siteImageUrl: string,
    id: string
  ) {
    this.siteName = siteName;
    this.siteURL = siteURL;
    this.siteImageUrl = siteImageUrl;
    this.siteId = id;

    this.formState = 'Edit';
  }
}
