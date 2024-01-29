import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatInputModule, MatCard, MatCardHeader, MatCardModule, RouterLink, MatButtonModule, MatIconModule, ReactiveFormsModule, ToastrModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerGroup!: FormGroup;
  constructor(private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.registerGroup = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15)
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(1)
      ]),
      email: new FormControl('', [
        Validators.email,
        Validators.email
      ]),
      password: new FormControl('', Validators.required),
      confirmPwd: new FormControl('', Validators.required),
      address: new FormGroup({
        address1: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        zip: new FormControl('', [
          Validators.required,
          Validators.maxLength(6),
          Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')
        ])
      })
    })
  }

  onRegister() {
    if (this.registerGroup.valid) {
      this.authService.registerUser(this.registerGroup.value).subscribe(res => {
        console.log(res);
        if (res) {
          this.toastr.success("Registration Successful. Please login to continue...", "Success");
          this.router.navigate(['/dashboard']);
        } else {
          this.toastr.error("Registration Unuccessful", "Error");
        }

      });
    } else {
      this.toastr.error("Registration Unuccessful", "Error");
    }
  }

}
