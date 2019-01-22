import { AuthService } from './../../../core/auth.service';
import { NotificatorService } from './../../../core/notificator.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-tech-user',
  templateUrl: './register-tech-user.component.html',
  styleUrls: ['./register-tech-user.component.css']
})
export class RegisterTechUserComponent implements OnInit {

  regForm: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly notificator: NotificatorService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.regForm = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required]),
      password: this.formBuilder.control('', [Validators.required])
    });
  }

  public register(): void {
    this.authService.registerTechUser(this.regForm.value).subscribe(
      () => {
        this.notificator.success('Registered successfully!');
      },
      error => {
        console.log(error);
        this.notificator.error(error.error.message, 'Registration failed!');
      }
    );
  }

}
