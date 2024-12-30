import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-settings-panel',
  templateUrl: './user-settings-panel.component.html',
  styleUrls: ['./user-settings-panel.component.css']
})
export class UserSettingsPanelComponent implements OnInit {

  settings: any = null;
  error: string | null = null;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getUserSettings().subscribe({
      next: (data: any) => this.settings = data,
      error: (err: any) => this.error = 'Failed to load user settings'
    });
  }
}
