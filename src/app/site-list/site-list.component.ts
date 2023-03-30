import { Component } from '@angular/core';
import {PasswordManagerService} from "../password-manager.service";

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent {

  constructor(private passwordmanager: PasswordManagerService) {
  }
  onSubmit(values: object) {
    console.log(values)
    this.passwordmanager.addSite(values)
      .then(()=>{
        console.log("Data save Successfully")
      })
      .catch(err =>{
        console.log(err);
      })

  }

}
