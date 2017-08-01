import { Component, ElementRef, OnInit, OnChanges, Input, Output, EventEmitter, ContentChildren, QueryList } from '@angular/core';
import { CfCoreComponent } from '../core/core.component';
import { IconStylingModel } from '../../models/icon/icon-styling.model';
import { RatingModel } from '../../models/rating/rating.model';
import { RatingStylingModel } from '../../models/rating/rating-styling.model';
import { RatingTemplates } from '../../templates/rating.template';

import { TemplateService } from '../../services/template-service/template.service';
/**
 * <p>Rating component which has vertical/horizontal icons, icon order changing and other basic functionality.</p>
 * <p>Example of using Menu:</p>
 * <pre>
 * <code><</code>cf-rating [properties]="myRating" [styling]="myRatingStyles"<code>></code><code><</code><code>/</code>cf-rating<code>></code>
 * </pre>
 */
@Component({
  selector: 'cf-rating',
  templateUrl: './lib/components/rating/rating.component.html',
  styleUrls: ['./lib/components/rating/rating.component.css']
})
export class CfRatingComponent extends CfCoreComponent implements OnInit {
  /**
   * It is an RatingModel object with options to be rendered into component template
   */
	cfRating: RatingModel;
  /**
   * It is an array to be filled with items according to MAX property
   */
	cfItems: number[] = []; 

  iconStyling = new IconStylingModel({
    icon:{
      class:"",
      dynamicClass:"",
      themeColor:""
    }
  });

  /**
   * It is an attribute <b>[properties]</b> of directive <b>cf-rating</b> which take RatingModel object.
   * <p>Example of Rating json object:</p>
   * <pre>{
   *  label: 'Rating label',
   *  icon: 'stars',
   *  value: 1,
   *  max: 5,
   *  countFromEnd: false,
   *  iconsVertical: false
   *  disable: false
   * }</pre>
   * <h4>label: string</h4>
   * Label for component
   * <h4>icon: string</h4>
   * Name of icon
   * <h4>value: number</h4>
   * Value of rating and means number of filled/selected icons
   * <h4>max: number</h4>
   * Number of rating icons
   * <h4>countFromEnd: boolean</h4>
   * Means to start icons counting order
   * <h4>iconsVertical: boolean</h4>
   * Means to show icons vertically
   * <h4>disable: boolean</h4>
   * Means component to be disabled
   */
	@Input() properties: RatingModel;
  /**
   * It is an object with styling component elements RatingStylingModel object
   */
	@Input() styling: RatingStylingModel;
  /**@hidden
   * 
   */
  constructor(public elementRef: ElementRef,/**@hidden */ templateService:TemplateService) { super(elementRef, templateService); }
  /**
   * Initialize all data 
   */
  ngOnInit() {
    this.getMyTemplate("rating",RatingTemplates).then(() => {
      if(this.compTemplate!=null && this.compTemplate!="")
      {
        if(RatingTemplates[this.compTemplate]!=null)
        {
          this.activeTemplate = RatingTemplates[this.compTemplate];
        }
        else
          this.activeTemplate = this.compTemplate;
      }
      if(this.properties==null)
      {
        this.properties = new RatingModel(this.activeTemplate["property"]);
      }
      else
      {
        var mainKeys = Object.keys(this.activeTemplate["property"]);
        for(let key of mainKeys)
        {
          if(this.properties[key]==null)
            this.properties[key]=this.activeTemplate["property"][key];
        }
      }
      this.cfRating = this.properties;
      if(this.styling==null) 
      {
        this.styling = new RatingStylingModel(this.activeTemplate["style"]);
        this.styling.icon = this.iconStyling;
      }
      else if(this.styling.icon==null)
      {
        this.styling.icon = this.iconStyling;
      }

      for (var i = 0; i < this.cfRating.max; ++i) {
          console.log('adding an item');
        this.cfItems.push(i);
      }
    });
  }
  // ngOnChanges(changes: any) {
  // 	console.log('changes', changes);
  // }
  /**
   * Function to set component value
   * @param index  it is used to calculate component value
   */
  private setRating(index) {
      console.log('tryna set that rating!!!');
  	if(!this.cfRating.disable) this.cfRating.value = index + 1;
  }
  /**
   * Function to unselect current item by user double-click and change component value
   * @param index  it is used to calculate component value
   */
  private resetCurrentItem(index) {
  	if(!this.cfRating.disable) this.cfRating.value = index;
  }
  /**
   * Function to set filled color for icons
   */
  private getHighlitedColor() {
  	return !this.cfRating.disable ? this.styling.filledColor : 'rgba(0,0,0,0.5)';
  }
  /**
   * Function to set empty color for icons
   */
  private getEmptyColor() {
  	return !this.cfRating.disable ? this.styling.emptyColor : 'rgba(0,0,0,0.2)';
  }
}