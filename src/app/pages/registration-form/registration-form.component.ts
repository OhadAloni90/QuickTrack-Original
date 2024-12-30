import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  email: string = '';
  password: string = '';
  constructor() { }

  ngOnInit() {
  }
  onSubmit() {
    console.log('Registering with:', this.email, this.password);
    // In a real scenario, you'd call your ApiService here
  }

}
