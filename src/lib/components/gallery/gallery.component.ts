import { Component, ViewChild, Input } from "@angular/core";
import { TNSFontIconService } from 'nativescript-ng2-fonticon';

@Component({
  selector: "cf-gallery",
  templateUrl: './lib/components/gallery/gallery.component.html',
  styleUrls: [
      './lib/components/gallery/gallery.component.css'
  ]
})
export class CfGalleryComponent {
  @Input() pictures: [{
    url: string,
    caption: string
  }];
  constructor() {
  }
}
