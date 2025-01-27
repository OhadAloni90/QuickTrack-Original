import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  // The LoaderComponent does not require additional logic for now
  // as it will be controlled by the loading state from a service or interceptor.
}