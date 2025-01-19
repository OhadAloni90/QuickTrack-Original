import { Component, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product: any;

  constructor(private apiService: ApiService) {}

  toggleRecommended() {
    const newRecommendedStatus = !this.product.recommended;
    this.apiService.toggleProductRecommended(this.product.id, newRecommendedStatus).subscribe({
      next: () => {
        this.product.recommended = newRecommendedStatus;
      },
      error: (err) => {
        console.error('Failed to update recommended status', err);
      }
    });
  }
}
