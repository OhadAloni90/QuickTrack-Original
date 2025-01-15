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
  @Output() inputChange = new EventEmitter<string>();
  errMsgs: string[] = [];
  constructor() { }

  ngOnInit() {
    if (!this.inputText) {
      this.errMsgs.push('This field is required.');
    }
  }

  onInputChange(value: string) {
    this.inputText = value;
    this.inputChange.emit(this.inputText);
    this.errMsgs = []; // Clear previous errors
    if (!this.inputText) {
      this.errMsgs.push('This field is required.');
    }
  }

}