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
  selectedUserId: string = '';
  newRole: string = '';
  constructor(private api: ApiService, public authService: AuthService) {}
  ngOnInit() {
    const id = this.authService.getUserId();
   if(id) this.api.getUserSettings(id).subscribe({
      next: (data: any) => this.settings = data.settings,
      error: (err: any) => this.error = 'Failed to load user settings'
    });
  }
  onChangeUserRole() {
    // Logic to handle role change
    console.log(`Changing role for user ID: ${this.selectedUserId} to new role: ${this.newRole}`);
    // Implement the actual role change logic here
  }
}