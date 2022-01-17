import { Component } from '@angular/core';
import { ScrollDispatcher } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isBlackHeader: boolean = false;

  title = 'mooncakespacenews';

  constructor(
    private scrollDispatcher: ScrollDispatcher
  ) {
    this.scrollDispatcher.scrolled().subscribe(x => {
      if (this.isBlackHeader != true) {
        if (window.scrollY > 10) {
          this.isBlackHeader = true;
          console.log(this.isBlackHeader)
        }
      } else if (window.scrollY < 10) {
        this.isBlackHeader = false;
        console.log(this.isBlackHeader)
      }
    })
  }


}
