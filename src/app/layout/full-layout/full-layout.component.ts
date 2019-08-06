import { Component, OnInit } from '@angular/core';

/**
 * Full layout component class.
 */
@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.css']
})
export class FullLayoutComponent implements OnInit {

  encodeduuid:string;
  constructor() { }

  ngOnInit() {
    this.encodeduuid = localStorage.getItem("encodeUri");    
  }

}
