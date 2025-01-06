import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  successMessage: string = '';
  errorMessage: string = '';
  constructor(private api: ApiService, private auth: AuthService) { }

  ngOnInit() {
  }

  onLogin() {
    this.api.login({ email: this.email, password: this.password })
    .subscribe({
      next: (resp) => {
        // resp might look like { success: true, userId: "...", token: "...", message: "..."}
        if (resp.success) {
          // store user data
          this.auth.setUserData({ userId: resp.userId, token: resp.token });
          this.successMessage = 'Logged in successfully!';
          // do any post-login navigation or calls
        }
      },
      error: (err) => {
        this.errorMessage = 'Login failed';
      }
    });
    }

}
