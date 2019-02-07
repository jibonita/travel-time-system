import { AuthService } from './../../../core/auth.service';
import { NotificatorService } from './../../../core/notificator.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { МodalComponent } from 'src/app/shared/modal/modal.component';

@Component({
  selector: 'app-register-tech-user',
  templateUrl: './register-tech-user.component.html',
  styleUrls: ['./register-tech-user.component.css']
})
export class RegisterTechUserComponent implements OnInit {

  regForm: FormGroup;

  @ViewChild(МodalComponent) public modal: МodalComponent;
  @Output() public newTechUser = new EventEmitter<FormGroup>();

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
      (data) => {
        this.emitNewTechUserAddedEvent(data);
        this.notificator.success('Registered successfully!');
        this.modal.close();
        this.regForm.reset();
      },
      error => {
        console.log(error);
        this.notificator.error(error.error.message, 'Registration failed!');
      }
    );
  }

  public emitNewTechUserAddedEvent(value): void {
    this.newTechUser.emit(value);
  }

  public showUserForm(): void {
    this.modal.open();
  }

}
