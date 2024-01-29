import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Router, RouterLink } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    RouterLink,
    ToastrModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private router: Router,
    private authService: AuthService,
    private toastr: ToastrService) {
  }
  hide = true;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }
  temp: any;
  onLogin() {
    if (this.loginForm.valid) {
      this.authService.getUser(this.loginForm.value).subscribe(resp => {
        this.temp = Object.values(resp);
        this.temp = this.temp.filter((data: any) => {
          return data.email === this.loginForm.value.email && data.password === this.loginForm.value.password
        })
        if (this.temp.length > 0) {
          localStorage.setItem('token', 'loggedIn');
          localStorage.setItem('user', this.temp[0].firstName);
          this.router.navigate(['/dashboard']);
          this.toastr.success('Login Successful', 'Success');
        } else {
          this.toastr.error('Invalid Credentials', 'Error');
        }
      })
    } else {
      this.toastr.error('Invalid Credentials', 'Error');
    }
  }
}
