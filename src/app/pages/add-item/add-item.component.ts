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
  selectedFiles: File[] = [];
  constructor(private api: ApiService, private auth: AuthService) { }

  ngOnInit() {
    this.userId = this.auth.getUserId();
  }
  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  onAddItem() {
    const formData = new FormData();
    formData.append('name', this.newItem.name);
    formData.append('price', this.newItem.price);
    formData.append('description', this.newItem.description);
    formData.append('ownerId', this.userId as string);

    this.selectedFiles.forEach(file => {
      formData.append('files', file, file.name);
    });

    this.api.createItem(formData).subscribe({
      next: (response) => {
        this.successMessage = 'Item created successfully!';
        this.errorMessage = null;
        this.newItem = { name: '', price: '', description: '' };
        this.selectedFiles = [];
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Failed to create item';
        this.successMessage = null;
      }
    });
  }
}