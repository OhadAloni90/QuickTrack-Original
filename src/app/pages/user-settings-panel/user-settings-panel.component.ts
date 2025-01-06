import { Component, OnInit } from '@angular/core';
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
  newItem = {
    name: 'Milk',
    price: 2,
    description: 'Milk 1 liter'
  };
  constructor(private api: ApiService, private auth: AuthService) {}

  ngOnInit() {
    const id = this.auth.getUserId();
   if(id) this.api.getUserSettings(id).subscribe({
      next: (data: any) => this.settings = data.settings,
      error: (err: any) => this.error = 'Failed to load user settings'
    });
  }
}
