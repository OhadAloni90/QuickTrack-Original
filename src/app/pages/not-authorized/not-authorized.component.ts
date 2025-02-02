import { Component } from '@angular/core';

@Component({
  selector: 'app-not-authorized',
  template: `
    <div class="not-authorized-container">
      <h1>Access Denied</h1>
      <p>You are not authorized to view this page. Please contact your administrator if you believe this is an error.</p>
    </div>
  `,
  styles: [`
    .not-authorized-container {
      text-align: center;
      margin-top: 50px;
    }
    h1 {
      color: #ff0000;
    }
    p {
      color: #333;
    }
  `]
})
export class NotAuthorizedComponent {}
