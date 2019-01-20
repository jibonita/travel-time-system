import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { NotificatorService } from '../../core/notificator.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit{

  regForm: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly notificator: NotificatorService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this. regForm = this.formBuilder.group({
      email: this.formBuilder.control('pesho@mail.com', [Validators.required]),
      password: this.formBuilder.control('pesho', [Validators.required])
    });
    
  }

  public register(): void {
    this.authService.registerUser(this.regForm.value).subscribe(
      () => {
        this.notificator.success('Registered successfully!');
        this.router.navigate(['/users/login']);
      },
      error => {
        console.log(error);
        this.notificator.error(error.error.message, 'Registration failed!');
      }
    );
  }

  public cancel(): void {
    this.router.navigate(['/home']);
  }

  // Temp method to print data. To be deleted
  save() {
    console.log(this.regForm);
    console.log('Saved: ' + JSON.stringify(this.regForm.value));
  }

}
