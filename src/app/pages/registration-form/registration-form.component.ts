import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;
  successMessage: string | null = null;
  user = { username: '', email: '', password: '' };
  constructor(private api: ApiService) {}

  ngOnInit() {
  }
  onSubmit() {
    console.log('Registering with:', this.email, this.password);
    // In a real scenario, you'd call your ApiService here
  }

  onRegister() {
    this.api.register(this.user).subscribe({
      next: (resp) => {
        this.successMessage = 'User registered successfully';
        this.errorMessage = null;
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Registration failed';
        this.successMessage = null;
      }
    });
  }
}