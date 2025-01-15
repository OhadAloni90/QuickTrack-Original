import { Component, OnInit, Renderer2 } from '@angular/core';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'QuickTrack';

  constructor(private renderer: Renderer2, private api: ApiService, private auth: AuthService) {}

  ngOnInit() {
    this.applyUserTheme();
  }

  applyUserTheme() {
    const userId = this.auth.getUserId();
    if (userId) {
      this.api.getUserSettings(userId).subscribe((data: any) => {
        const theme = data.settings.theme;
        if (theme === 'dark') {
          this.renderer.addClass(document.body, 'dark-mode');
        } else {
          this.renderer.removeClass(document.body, 'dark-mode');
        }
      });
    }
  }
}