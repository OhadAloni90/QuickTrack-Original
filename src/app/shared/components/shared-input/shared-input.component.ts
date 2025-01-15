import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shared-input',
  templateUrl: './shared-input.component.html',
  styleUrls: ['./shared-input.component.css']
})
export class SharedInputComponent implements OnInit {
  @Input() inputText: string = '';
  @Input() showPreText: boolean = false;
  @Input() preText: string = '';
  errMsgs: string[] = [];
  constructor() { }

  ngOnInit() {
  }

}
