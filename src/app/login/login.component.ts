import { Component } from '@angular/core';
import { PasswordManagerService } from './../password-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private PasswordManagerService: PasswordManagerService, private router: Router) {};

  isError: boolean = false;

  onSubmit(values: any) {
    this.PasswordManagerService.login(values.email, values.password)
    .then(()=>{
      this.router.navigate(['/site-list'])
    })
    .catch(err =>{
      this.isError = true;
    })
  }
}
