import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shared-input',
  templateUrl: './shared-input.component.html',
  styleUrls: ['./shared-input.component.css']
})
export class SharedInputComponent implements OnInit {
  @Input() inputText: string = '';
  @Input() showPreText: boolean = false;
  @Input() preText: string = '';
  @Output() inputTextChange = new EventEmitter<string>();
  errMsgs: string[] = [];
  constructor() { }

  ngOnInit() {
    // Initial load should not show error messages
  }

  onInputChange() {
    this.inputTextChange.emit(this.inputText);
    this.errMsgs = []; // Clear previous errors
    if (!this.inputText) {
      this.errMsgs.push('This field is required.');
    }
  }

}