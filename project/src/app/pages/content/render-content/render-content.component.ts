import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-render-content',
  templateUrl: './render-content.component.html',
  styleUrls: ['./render-content.component.css']
})
export class RenderContentComponent implements OnInit {

  formJson: any;
  constructor() { }

  ngOnInit() {
    this.formJson = {
      "title": "sdfg"
    };
  }

}
