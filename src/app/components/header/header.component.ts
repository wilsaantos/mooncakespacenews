import { Component, Input, OnInit } from '@angular/core';
import { ScrollDispatcher } from '@angular/cdk/scrolling';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isBlackHeader: boolean;
  isTransparentHeader: boolean;

  constructor(private scrollDispatcher: ScrollDispatcher) {
    this.scrollDispatcher.scrolled().subscribe(x => {
      if (window.scrollY > 0 && this.isBlackHeader == false) {
        this.isBlackHeader = true;
        this.isTransparentHeader = false;
      } else {
        this.isTransparentHeader = true;
        this.isBlackHeader = false;
      }
    })
  }

  ngOnInit(): void {
  }

}
