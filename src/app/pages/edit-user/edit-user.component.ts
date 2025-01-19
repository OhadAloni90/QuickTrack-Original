import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
   username: string = '';
   email: string = '';
   successMessage: string | null = null;
   errorMessage: string | null = null;
  constructor(private api: ApiService, private auth: AuthService) { }

  ngOnInit() {
    this.api.getUserSettings(this.auth.getUserId() as string).subscribe((data: any) => {
      if(data) {
        this.username = data?.settings?.username;
        this.email = data?.settings?.email;
      }
    })
  }

  onUpdate() {
    const updatedData = {
      id: this.auth.getUserId(),
      username: this.username,
      email: this.email
    };

    this.api.updateUser(updatedData).subscribe({
      next: (response) => {
        this.successMessage = 'User updated successfully!';
        this.errorMessage = null;
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Failed to update user';
        this.successMessage = null;
      }
    });
  }
}