import {AfterViewChecked, ChangeDetectorRef, Component, OnInit, Renderer} from '@angular/core';

@Component({
  selector: 'title-back',
  templateUrl: './titleback.component.html',
  styleUrls: ['./titleback.component.css']
})
export class TitleBackComponent implements OnInit , AfterViewChecked{

  constructor(private renderer: Renderer, private changeDetector: ChangeDetectorRef) { }
 
  ngOnInit() {
    // this.renderer.listen('window', 'scroll', () => {
    //   // console.log(window)
    //   if(window.pageYOffset > 30 && window.scrollY > 200) {
    //     this.showFixedHeader = true;
    //   }else {
    //     this.showFixedHeader = false;
    //   }
    // });
  }

  onViewMenuChanged({ minViewMenu }) {

    // console.log(minViewMenu)
    // this.minViewMenu = minViewMenu;
  }


  ngAfterViewChecked() {
    // this.changeDetector.detectChanges();
  }


}
