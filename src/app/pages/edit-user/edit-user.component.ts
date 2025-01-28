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
  constructor(private api: ApiService, public authService: AuthService) { }

  ngOnInit() {
    this.api.getUserSettings(this.authService.getUserId() as string).subscribe((data: any) => {
      if(data) this.username = data?.settings?.username;
    })
  }

}