import { Component, ElementRef, Input, OnDestroy, OnInit, SimpleChange, ViewChild } from '@angular/core';

@Component({
  selector: 'loading',
  templateUrl: './loading.html',
  styleUrls: [
    './loading.css',
  ],
})
export class LoadingComponent implements OnInit, OnDestroy {
  @Input() public isshow:boolean = false;

  // @ViewChild('bgEle') bgEle: ElementRef;


  constructor() {

  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    // let options = changes['isshow'].currentValue || '';
    // console.log("-----",options)
    // if (options !== '') {
    //   // this.options = options;
    //   // console.log(this.options);
    // }
  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
  }

  getWidth(el: any): number {
    let styles = window.getComputedStyle(el);
    let width = el.offsetWidth;
    let borderLeftWidth = parseFloat(styles.borderLeftWidth);
    let borderRightWidth = parseFloat(styles.borderRightWidth);
    let paddingLeft = parseFloat(styles.paddingLeft);
    let paddingRight = parseFloat(styles.paddingRight);
    return width - borderLeftWidth - borderRightWidth - paddingLeft - paddingRight;
  }

  getHeight(el: any): number {
    let styles = window.getComputedStyle(el);
    let height = el.offsetHeight;
    let borderTopWidth = parseFloat(styles.borderTopWidth);
    let borderBottomWidth = parseFloat(styles.borderBottomWidth);
    let paddingTop = parseFloat(styles.paddingTop);
    let paddingBottom = parseFloat(styles.paddingBottom);
    return height - borderBottomWidth - borderTopWidth - paddingTop - paddingBottom;
  }
}
