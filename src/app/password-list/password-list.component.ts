import { PasswordManagerService } from './../password-manager.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

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

  passwordList!: Observable<Array<any>>;

  email!: string;
  username!: string;
  password!: string;
  passwordId!: string;

  formState: string = 'Add New';

  constructor(
    private route: ActivatedRoute,
    private PasswordManagerService: PasswordManagerService
  ) {
    this.route.queryParams.subscribe((val: any) => {
      this.siteId = val.id;
      this.siteName = val.siteName;
      this.siteURL = val.siteURL;
      this.siteImageUrl = val.siteImageUrl;
    });

    this.loadPasswords();
  }

  onSubmit(values: object) {
    if (this.formState == 'Add New') {
      this.PasswordManagerService.addPassword(values, this.siteId)
        .then(() => {
          console.log('Password Saved!');
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (this.formState == 'Edit') {
      this.PasswordManagerService.updatePassword(
        this.siteId,
        this.passwordId,
        values
      )
        .then(() => {
          console.log('Data Updated');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  loadPasswords() {
    this.passwordList = this.PasswordManagerService.loadPasswords(this.siteId);
  }

  editPassword(
    email: string,
    username: string,
    password: string,
    passwordId: string
  ) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.passwordId = passwordId;

    this.formState = 'Edit';
  }
}
