import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { NotificatorService } from 'src/app/core/notificator.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../../core/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly storageService: StorageService,
    private readonly router: Router,

    // Here is used the module ngx-toastr https://www.npmjs.com/package/ngx-toastr registered at the app.module.ts
    private readonly notificator: ToastrService,
    private readonly formBuilder: FormBuilder,
  ) { }


  ngOnInit() {

    const email = this.formBuilder.control('pesho@mail.com', [Validators.required]);
    const password = this.formBuilder.control('pesho', [Validators.required]);
    this.loginForm = this.formBuilder.group({
      email,
      password,
    });
}


  public login(): void {
    this.authService.loginUser(this.loginForm.value).subscribe(
      () => {
        //this.notificator.success('Logged in successfully!');
        this.router.navigate(['/landing']);
      },
      error => {
        console.log(error);
        this.notificator.error(error.message, 'Login failed!');
      }
    );
  }

}
