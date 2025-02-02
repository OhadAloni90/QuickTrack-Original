import { Component, OnInit } from '@angular/core';
import { Navigation } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-settings-panel',
  templateUrl: './user-settings-panel.component.html',
  styleUrls: ['./user-settings-panel.component.css']
})
export class UserSettingsPanelComponent implements OnInit {

  settings: any = null;
  error: string | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  selectedUserId: string = '';
  newRole: string = '';
  constructor(private apiService: ApiService, public authService: AuthService) {}
  ngOnInit() {
    const id = this.authService.getUserId();
   if(id) this.apiService.getUserSettings(id).subscribe({
      next: (data: any) => this.settings = data.settings,
      error: (err: any) => this.error = 'Failed to load user settings'
    });
  }
  onChangeUserRole() {
    this.apiService.updateUserRole(this.selectedUserId, this.newRole).subscribe({
      next: (response) => {
        this.successMessage = 'User role updated successfully.';
        this.errorMessage = null;
      },
      error: (error) => {
        this.errorMessage = 'Failed to update user role.';
        this.successMessage = null;
      }
    });
  }
}