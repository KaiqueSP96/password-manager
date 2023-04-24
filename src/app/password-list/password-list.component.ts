import { PasswordManagerService } from './../password-manager.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AES, enc } from 'crypto-js';
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

  passwordList!: Array<any>;

  email!: string;
  username!: string;
  password!: string;
  passwordId!: string;

  formState: string = 'Add New';

  isSuccess: boolean = false;
  successMessage!: string;

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

  showAlert(message: string) {
    this.isSuccess = true;
    this.successMessage = message;
  }

  resetForm() {
    this.email = '';
    this.username = '';
    this.password = '';
    this.formState = 'Add new';
    this.passwordId = '';
  }

  onSubmit(values: any) {
    const encryptedPassword = this.encryptPassword(values.password);
    values.password = encryptedPassword;

    if (this.formState == 'Add New') {
      this.PasswordManagerService.addPassword(values, this.siteId)
        .then(() => {
          this.showAlert('Data Saved');
          this.resetForm();
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
          this.showAlert('Data Updated');
          this.resetForm();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  loadPasswords() {
   this.PasswordManagerService.loadPasswords(this.siteId).subscribe(val =>{
    this.passwordList = val;
   })
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

  deletePassword(passwordId: string) {
    this.PasswordManagerService.deletePassword(this.siteId, passwordId)
      .then(() => {
        this.showAlert('Data delected');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  encryptPassword(password: string) {
    const secretKey = 'bPeShVmYq3t6w9z$C&F)J@NcRfTjWnZr';
    const encryptedPassword = AES.encrypt(password, secretKey).toString();
    return encryptedPassword;
  }

  decryptPassword(password: string) {
    const secretKey = 'bPeShVmYq3t6w9z$C&F)J@NcRfTjWnZr';
    const decPassword = AES.decrypt(password, secretKey).toString(enc.Utf8);
    return decPassword;
  }

  onDecrypt(password: string, index: number) {
    const decPassword = this.decryptPassword(password);
    this.passwordList[index].password = decPassword;
  }
}
