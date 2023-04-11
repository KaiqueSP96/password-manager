import { PasswordManagerService } from './../password-manager.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css'],
})
export class PasswordListComponent {
  siteId!: string;
  siteName!: string;
  siteURL!: string;
  siteImageUrl!: string;

  constructor(private route: ActivatedRoute, private PasswordManagerService: PasswordManagerService) {
    this.route.queryParams.subscribe((val: any) => {
      this.siteId = val.id;
      this.siteName = val.siteName;
      this.siteURL = val.siteURL;
      this.siteImageUrl = val.siteImageUrl;
    });
  }

  onSubmit(values: object) {
    this.PasswordManagerService.addPassword(values, this.siteId)
    .then(()=>{
      console.log("Password Saved!");
    })
    .catch (err =>{
      console.log(err);
    }) 
  }


}
