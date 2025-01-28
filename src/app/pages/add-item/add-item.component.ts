import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  newItem = {
    name: '',
    price: '',
    description: ''
  };
  successMessage: string | null = null;
  errorMessage: string | null = null;
  userId: string | null = '';
  constructor(private api: ApiService, public authService: AuthService) { }

  ngOnInit() {
    this.userId = this.authService.getUserId();
  }
  onAddItem() {
    // Attach the user’s ID
    const itemData = {
      ...this.newItem,
      ownerId: this.userId 
    };
    this.api.createItem(itemData).subscribe({
      next: (response) => {
        this.successMessage = 'Item created successfully!';
        this.errorMessage = null;
        // optionally reset form
        this.newItem = { name: '', price: '', description: '' };
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Failed to create item';
        this.successMessage = null;
      }
    });
  }
}