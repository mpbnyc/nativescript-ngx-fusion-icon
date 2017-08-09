import { Component, OnInit, Input, Output, ElementRef, EventEmitter, ViewEncapsulation, HostBinding } from '@angular/core';
import { CfCoreComponent } from '../core/core.component';
import { CfIconComponent } from '../icon/icon.component';
import { IconModel } from '../../models/icon/icon.model';
import { ButtonModel } from '../../models/button/button.model';
import { ButtonStylingModel } from '../../models/button/button-styling.model';
import { ButtonTemplates } from '../../templates/button.template';

import { TemplateService } from '../../services/template-service/template.service';

/**
 * <p>CF Button Component</p> 
 * <pre>
 * <code>
 * import { ButtonModel } from 'cedrus-fusion'
 * import { ButtonStylingModel } from 'cedrus-fusion'
 * <</code>cf-button<code>></code><code><</code><code>/</code>cf-button<code>>
 * </code>
 * </pre>
 */
@Component({
  selector: 'cf-button',
  template: `
<StackLayout class="{{styling?.container?.class}}" [ngClass]="getContainerClass()">
  <Button height="100" class="btn-primary {{styling?.button?.class}}" [color]="styling?.button?.themeColor" [isEnabled]="!disabled" (tap)="buttonTapped()">
      <FormattedString>
        <Span class="mdi" [text]="cfButton?.icon.position === 'left' ? (cfButton?.icon.name | fonticon) : ''" [fontSize]="cfButton?.icon.size" verticalAlign="middle" [styling]="styling?.iconStyling"></Span>
        <Span class="mdi" [text]="cfButton?.waiting?.value && cfButton?.waiting?.icon.position === 'left' ? (cfButton?.waiting?.icon.name | fonticon) : ''" [fontSize]="cfButton?.waiting?.icon.size" verticalAlign="middle" [styling]="styling?.waitingIconStyling"></Span>
        <Span [text]="cfButton?.label" fontAttributes="Bold" fontSize="24" verticalAlign="middle"></Span>
        <Span class="mdi" [text]="cfButton?.icon.position === 'right' ? (cfButton?.icon.name | fonticon) : ''" [fontSize]="cfButton?.icon.size" verticalAlign="middle" [styling]="styling?.iconStyling"></Span>
        <Span class="mdi" [text]="cfButton?.waiting?.value && cfButton?.waiting?.icon.position === 'right' ? (cfButton?.waiting?.icon.name | fonticon) : ''" [fontSize]="cfButton?.waiting?.icon.size" verticalAlign="middle" [styling]="styling?.waitingIconStyling"></Span>
      </FormattedString>
  </Button>
</StackLayout> 
  `,
  styleUrls: ['']
})
export class CfButtonComponent extends CfCoreComponent  implements OnInit{
  
  /**@hidden */
  @HostBinding('class') notifacationClickable = '';

  /** @hidden
	 * It is the button object bound to the button component
	 */
	cfButton: ButtonModel;

  /** @hidden
   * <p> The type of the needed button.</p>
   * <p> Type can be: mat-button, mat-raised-button, mat-fab, mat-mini-fab and mat-icon-button.</p>
   */
  buttonType: string;

  /**
   * <pre>{
   *  display: boolean,         // True or False <b>Default: True</b>
   *  disable: boolean,         // True or False <b>Default: False</b>
   *  label: string,            // <b>Default: 'Button'</b>
   *  iconProperty: IconModel,  //Refer to Icon Component
   *  iconPosition: string,     //'left', 'right' <b>Default: 'left'</b>
   *  waiting: {
   *   value: boolean,         //Display waiting mode (Icon)
   *   disable: boolean,       // True or False
   *   iconProperty: IconModel //Refer to Icon Component
   *  }
   *}
   * </pre>
   * </pre>
	 * <p>Example</p>
	 * <pre>{
	 *	label: 'Cart',
	 *	iconProperty:{
   *  name: 'fa-shopping-cart',
	 *  size: '18px',
	 *  value: 'buy',
   * },
   * iconPosition: 'right'
	 *}
	 * </pre>
   */
  @Input()
	public properties: ButtonModel;

	/**
	 *<p> dynamicClass: function() -> string,	// Function that returns name of the class </p>
	 *<p> class: string											  // Name of the css class selector </p>
	 *<p> themeColor: string									  // primary/accent/warn </p>
	 *<pre>
	 *{
	 *	// Container surrounding the Button
	 *	container:{
	 *		dynamicClass,
	 *		class
	 *	},
	 *	// md-button styling
	 *	button:{
	 *		dynamicClass,
	 *		class,
	 *		themeColor
	 *	},
	 *	// Icon styling: Refer to icon component
	 *	iconStyling: IconStylingModel
	 *}
	 * </pre>
	 */
  @Input()
	public styling: ButtonStylingModel;

  /**
   * <p> The label for the button</p>
   */
  @Input() label: string;
  
  /**
   * <p> The name of the icon</p>
   * <p> Refer to icon component</p>
   */
  @Input() iconName: string;

  /**
   * <p> The icon position on the button</p>
   * <p> Options: 'left' or 'right'</p>
   * <p> Default: <b>'left'</b></p>
   */
  @Input() iconPosition: string;

  /**
   * <p> Display waiting mode (Icon)</p>
   */
  @Input() wait: boolean;

  /** <b>Output</b>
   * <p>The event will be emitted when the button is clicked</p>
   */
  @Output()
  onTap = new EventEmitter();

   /**@hidden */
  constructor( /**@hidden */public elementRef: ElementRef,/**@hidden */ templateService:TemplateService) {
    super(elementRef, templateService);
    console.log("I am in the constrctor");
  }

  /** @hidden
   * <p>On initialization:</p>
   * <p>Check to see if any of the angular material button types are needed to be passed to the child button.</p>
   * <p>Types are: <b>md-button</b>, <b>md-raised-button</b>, <b>md-icon-button</b>, <b>md-fab</b>, <b>md-mini-fab</b></p>
   * <p> Then initialize the button element </p>
   */
  ngOnInit() {
    super.ngOnInit();

    this.getMyTemplate("button",ButtonTemplates).then(() => {
      console.log('attempting to get template');
      if(this.properties==null)
      {
        console.log('active template is:');
        console.log(this.activeTemplate);
        this.properties = new ButtonModel(this.activeTemplate["property"]);
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

      if(this.styling==null)
      {
        this.styling = new ButtonStylingModel (this.activeTemplate["style"]);
      }
      if(this.disable!=null) this.properties.disable = this.disable;
      if(this.wait!=null) this.properties.waiting.value = this.wait;
      if(this.display!=null) this.properties.display = this.display;
      if(this.label!=null) this.properties.label = this.label;
      if(this.iconPosition!=null) this.properties.iconPosition = this.iconPosition;
      if(this.iconName!=null)
      {
        if(this.properties.iconProperty==null)
          this.properties.iconProperty = new IconModel();
        this.properties.iconProperty.name = this.iconName;
        if(this.iconName.startsWith("fa-"))
          this.properties.iconProperty.type = "fa";
        else
          this.properties.iconProperty.type = "mi";
      }

      this.cfButton = this.properties;

      if(this.notificationAction.observers.length>0) this.notifacationClickable = 'notification-clickable';

			});
  }

  /** @hidden
   * <p> Keep the properties object updated with any changes from external properties to keep the button dynamic.</p>
   * @param changes
   */
  ngOnChanges(changes: any) {
    console.log("I am in ngonchanges");
    if(this.properties!=null)
    {
      if(changes.disable!=null) this.properties.disable = changes.disable.currentValue;
      if(changes.wait!=null) this.properties.waiting.value = changes.wait.currentValue;
      if(changes.display!=null) this.properties.display = changes.display.currentValue;
      if(changes.label!=null) this.properties.label = changes.label.currentValue;
      if(changes.iconPosition!=null) this.properties.iconPosition = changes.iconPosition.currentValue;
      if(changes.iconName!=null)
      {
        if(this.properties.iconProperty==null)
          this.properties.iconProperty = new IconModel();
        this.properties.iconProperty.name = changes.iconName.currentValue;
        if(changes.iconName.currentValue.startsWith("fa-"))
          this.properties.iconProperty.type = "fa";
        else
          this.properties.iconProperty.type = "mi";
      }
    }
  }

  /** @hidden
   * <p>The method will emit event when the button is clicked</p>
   */
  buttonTapped() {
    this.onTap.emit();
  }

  /** @hidden
   * It is function for creating Notification click events by using Core Component <b>notificationAction</b> event emmiter.
   * @param notification  it is json notification object
   */
  cfNotificationAction(notification) {
    this.notificationAction.emit(notification);
  }
	/**@hidden */
  getButtonClass(){
    if(this.styling!=null && this.styling.button!=null&& this.cfButton!=null)
    {
      try
      {
        var classes = "";
        var mainKeys = Object.keys(this.styling.button.dynamicClass);
        for(let key of mainKeys){
          if(eval(this.styling.button.dynamicClass[key])==true)
            classes = classes+" "+key;
          }
        return classes;
      }
      catch(e)
      {
        //Do nothing
      }
    }
  }
	/**@hidden */
  getContainerClass(){
    if(this.styling!=null && this.styling.container!=null&& this.cfButton!=null)
    {
      try
      {
        var classes = "";
        var mainKeys = Object.keys(this.styling.container.dynamicClass);
        for(let key of mainKeys){
          if(eval(this.styling.container.dynamicClass[key])==true)
            classes = classes+" "+key;
          }
        return classes;
      }
      catch(e)
      {
        //Do nothing
      }
    }
  }
}