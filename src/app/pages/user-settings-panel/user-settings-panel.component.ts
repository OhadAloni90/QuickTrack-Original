import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Navigation } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-settings-panel',
  templateUrl: './user-settings-panel.component.html',
  styleUrls: ['./user-settings-panel.component.css']
})
export class UserSettingsPanelComponent implements OnInit {

  @Output() themeChanged = new EventEmitter<string>();
  settings: any = null;
  error: string | null = null;

  constructor(private api: ApiService, private auth: AuthService) {}

  ngOnInit() {
    const id = this.auth.getUserId();
    if (id) {
      this.api.getUserSettings(id).subscribe({
        next: (data: any) => this.settings = data.settings,
        error: (err: any) => this.error = 'Failed to load user settings'
      });
    }
  }

  toggleTheme() {
    if (this.settings) {
      const newTheme = this.settings.theme === 'dark' ? 'light' : 'dark';
      this.settings.theme = newTheme;
      const id = this.auth.getUserId();
      if (id) {
        this.api.updateUserSettings(id, { theme: newTheme }).subscribe({
          next: () => this.themeChanged.emit(newTheme),
          error: (err: any) => this.error = 'Failed to update theme'
        });
      }
    }
  }
}