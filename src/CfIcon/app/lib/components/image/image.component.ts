import { Component, OnInit, Input, ElementRef, HostBinding } from '@angular/core';
import { CfCoreComponent } from '../core/core.component';
import { ImageModel } from '../../models/image/image.model';
import { ImageStylingModel } from '../../models/image/image-styling.model';
import { ImageTemplates } from '../../templates/image.template';

import { TemplateService } from '../../services/template-service/template.service';


/**
 * <p>CF Image Component</p> 
 * <pre>
 * <code>
 * import { ImageModel } from 'cedrus-fusion'
 * import { ImageStylingModel } from 'cedrus-fusion'
 * <code><</code>cf-image<code>></code><code><</code><code>/</code>cf-image<code>></code>
 * </code>
 * </pre>
 */
@Component({
	selector: 'cf-image',
	templateUrl: './lib/components/image/image.component.html',
	styleUrls: ['./lib/components/image/image.component.css']
})
export class CfImageComponent extends CfCoreComponent implements OnInit {
	
	/**@hidden */
	@HostBinding('class') notifacationClickable = '';

	/** @hidden
	 * <p> The object bound to the tempalte.<p>
	 */
	cfImage: ImageModel;

  /**
	 * <pre>{
	 *  display: boolean,      // True or False <b>Default: True</b>
	 *  disable: boolean,      // True or False <b>Default: False</b>
   *  label: string,         // Default: 'Default Caption'
	 *  labelPosition: string, // Default: 'bottom'
	 *  url: string            //Default: 'https:.../jpg'
	 *}
	 * </pre>
	 * </pre>
	 * <p>Example</p>
	 * <pre>{
	 *  display: true,
	 *  label: 'Siberian Husky'
   *  labelPosition: 'left',
	 *  url: 'assets/images/siberian-husky.jpg'
	 *}
	 * </pre>
   */
	@Input()
	public properties: ImageModel;

	/**
	  *<p> dynamicClass: function() -> string,	// Function that returns name of the class </p>
		*<p> class: string												// Name of the css class selector </p>
		*<p> themeColor: string										// primary/accent/warn </p>
	  *<pre>
		*{
	  *	// Container surrounding the Image
	  *	container:{
	  *		dynamicClass,
	  *		class
	  *	},
	  *	// image styling
	  *	image:{
	  *		dynamicClass,
	  *		class
	  *	},
	  *	// label styling
	  *	label:{
	  *		dynamicClass,
	  *		class
	  *	}
	  *}
	  * </pre>
	  */
	@Input()
	public styling: ImageStylingModel;

	/**
	 * <p> Display or hide the image</p>
	 */
	@Input() public display: boolean;

	/**
	 * <p> The label of the image</p>
	 */
	@Input() public label: string;
    
    /**
	 * <p> The alt text of the image</p>
	 */
	@Input() public alt: string;

	/**
	 * <p> The label position of the image</p>
	 * <p> Options: 'top', 'bottom', 'right', 'left'</p>
	 */
	@Input() public labelPosition: string;
	
	/**
	 * <p> The url of the iamge.</p>
	 */
	@Input() public url: string;

	/** @hidden
	 * It is function for creating Notification click events by using Core Component <b>notificationAction</b> event emmiter.
     * @param notification	it is json notification object
	 */
	cfNotificationAction(notification) {
		this.notificationAction.emit(notification);
	}

	/**@hidden */
	constructor(/**@hidden */public elementRef: ElementRef,/**@hidden */ templateService:TemplateService) {
		super(elementRef, templateService);
	}

	/** @hidden
	 * <p> Initialize the proerties and styling object with the appropriate values.</p>
	 */
	ngOnInit(): void {
		if(this.notificationAction.observers.length > 0) this.notifacationClickable = 'notification-clickable';
		this.getMyTemplate("image",ImageTemplates).then(() => {
			if(this.properties==null)
			{
				this.properties = new ImageModel(this.activeTemplate["property"]);
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
				this.styling = new ImageStylingModel (this.activeTemplate["style"]);

			if(this.display!=null) this.properties.display = this.display;
			if(this.label!=null) this.properties.label = this.label;
			if(this.labelPosition!=null) this.properties.labelPosition = this.labelPosition;
			if(this.url!=null) this.properties.url = this.url;

			this.cfImage = this.properties;
		});
	}

	/** @hidden
	 * <p> Update the properties object with hte changes on the inputs to keep the image dynamic.</p>
	 * @param changes
	 */
	ngOnChanges(changes: any){
		if(this.properties!=null)
		{
			if(changes.display!=null) this.properties.display = changes.display.currentValue;
			if(changes.label!=null) this.properties.label = changes.label.currentValue;
			if(changes.labelPosition!=null) this.properties.labelPosition = changes.labelPosition.currentValue;
			if(changes.url!=null) this.properties.url = changes.url.currentValue;
		}
	}

	getImageClass(){
    if(this.styling!=null && this.styling.image!=null&& this.cfImage!=null)
    {
      try
      {
        var classes = "";
        var mainKeys = Object.keys(this.styling.image.dynamicClass);
        for(let key of mainKeys){
          if(eval(this.styling.image.dynamicClass[key])==true)
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

  getContainerClass(){
    if(this.styling!=null && this.styling.container!=null&& this.cfImage!=null)
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

	getLabelClass(){
    if(this.styling!=null && this.styling.label!=null&& this.cfImage!=null)
    {
      try
      {
        var classes = "";
        var mainKeys = Object.keys(this.styling.label.dynamicClass);
        for(let key of mainKeys){
          if(eval(this.styling.label.dynamicClass[key])==true)
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