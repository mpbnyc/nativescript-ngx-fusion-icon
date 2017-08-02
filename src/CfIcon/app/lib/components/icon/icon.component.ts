import { Component, OnInit, Input, Output, ElementRef, EventEmitter, HostBinding } from '@angular/core';
import { CfCoreComponent } from '../core/core.component';
import { IconModel } from '../../models/icon/icon.model';
import { IconStylingModel } from '../../models/icon/icon-styling.model';
import { IconTemplates } from '../../templates/icon.template';
import { TNSFontIconService } from 'nativescript-ng2-fonticon';
import { TemplateService } from '../../services/template-service/template.service';

/**
 * <p>CF Icon Component</p> 
 * <pre>
 * <code>
 * import { IconModel } from 'cedrus-fusion'
 * import { IconStylingModel } from 'cedrus-fusion'
 * <code><</code>cf-icon<code>></code><code><</code><code>/</code>cf-icon<code>></code>
 * </code>
 * </pre>
 */
@Component({
  selector: 'cf-icon',
  template: `
	<Label class="mdi" [text]="currentIcon.name" [fontSize]="currentIcon.size" (tap)="cfIconToggled()"
	class="cf-icon-style cf-toggling-icon {{checked? styling?.icon?.class : styling?.toggleIcon?.icon? styling?.toggleIcon?.icon?.class: ''}}"
	[ngClass]="getIconClass()">
	</Label>
  `,
  styles: [
	`
	.mdi {
  		font-family: "Material Icons", "MaterialIcons-Regular";
	}
	`,
	`
	:host {
    position: relative;
    z-index: 0;
    display: inline-flex;
    &.cf-icon-is-disabled md-icon {
        color: rgba(0, 0, 0, 0.38) !important;
        background: transparent !important;
        background-color: transparent !important;
    }
    &.cf-menu-trigger md-icon {
        cursor: pointer;
        transition: all 0.2s ease;
        &:hover {
            transform: scale(1.1);
        }
    }
    .cf-toggling-icon {
        cursor: pointer;
    }
    &.notification-clickable cf-notification:hover {
        cursor: pointer;
    }
	}

	.mat-icon {
		padding: 0px;
	}

	// .cf-default-icon {
	//     background-color: transparent;
	// }
	.cf-close-icon {
		color: #EF5350;
	}

	.cf-icon-style {}
  `]
})

export class CfIconComponent extends CfCoreComponent implements OnInit {
	
	/**@hidden */
	@HostBinding('class') notifacationClickable = '';
	
	/** @hidden
	 * It is Icon object which will recive values provided by Icon Class and after that <b>md-icon</b> will be builded on page.
	 */
	cfIcon: IconModel;
	
	/** @hidden 
	 * <p>Whether the icon is in toggle mode or normal mode.</p>
	 */
	checked: boolean = true;

	/**@hidden */
	currentIcon: any = {};

  /**
	 * <pre>{
	 *  display: boolean,	// True or False <b>Default: True</b>
	 *  disable: boolean,	// True or False <b>Default: False</b>
	 *  name: string,			// Default: 'Home'
	 *  size: string,			// 'px', 'em', '%' <b>Default: '24px'</b>
	 *  value: any,				// Value emitted on click
	 *  toggle:{					// Toggling icon state
	 *   name: string,		// Name of icon toggled
	 *   size: string,		// Size of icon toggled
	 *   value: any			// Value of icon toggled
	 *  }
	 *}
	 * </pre>
	 * <p>Example</p>
	 * <pre>{
	 *	name: 'fa-heart-o',
	 *	size: '18px',
	 *	value: 'empty heart',
	 *	toggle: {
	 *		name: 'fa-heart',
	 *		size: '18px',
	 *		value: 'full heart'
	 *	}	
	 *}
	 * </pre>
   */
	@Input()
	public properties: IconModel;

	/**
	  *<p> dynamicClass: function() -> string,	// Function that returns name of the class </p>
		*<p> class: string												// Name of the css class selector </p>
		*<p> themeColor: string										// primary/accent/warn </p>
	  *<pre>
		*{
	  *	// Container surrounding the Icon
	  *	container:{
	  *		dynamicClass,
	  *		class
	  *	},
	  *	// md-icon styling
	  *	icon:{
	  *		dynamicClass,
	  *		class,
	  *		themeColor
	  *	},
	  *	// Toggle Icon styling with same structure as above
	  *	toggleIcon:{
	  *		container: {},
	  *		icon: {}
	  *	}
	  *}
	  * </pre>
	  */
	@Input()
	public styling: IconStylingModel;
	
	/**
	 * <p></p>
	 * <p>Name of the icon</p>
	 * <p>Default is <b>home</b></p>
	 * <p>Icon libraries available: Material Icons and Font Awesome Icons</p>
	 */
	@Input() public name: string;

	/**
	 * <p>Icon size</p>
	 * <p>Can be in pixels, em, percetages </p>
	 * <p>Default is <b>'24px'</b></p>
	 */
	@Input() public size: number;
	
	/**
	 * <b>Output</b>
   * <p>Event emited on toggle</p>
   */
	@Output()
	cfOnToggle: EventEmitter<any> = new EventEmitter<any>();

	@Output()
	cfOnTap: EventEmitter<any> = new EventEmitter<any>();

	/** @hidden
	 * It is function for set correct toggle value/icon and emmit event with icon state value.
	 */
	cfIconToggled() { 

		if(this.properties.toggle!=null)
		{
			this.checked = !this.checked;
			if(this.currentIcon==this.cfIcon)
				this.currentIcon = this.cfIcon.toggle;
			else
				this.currentIcon = this.cfIcon;
			this.cfOnToggle.emit(this.currentIcon.value); 
		} else {
			this.cfOnTap.emit();
		}
	}
	
	/** @hidden
	 * It is function for creating Notification click events by using Core Component <b>notificationAction</b> event emmiter.
   * @param notification	it is json notification object
	 */
	cfNotificationAction(notification) { 
		this.notificationAction.emit(notification); 
	}
	
	/**@hidden */
	constructor(/**@hidden */public elementRef: ElementRef,/**@hidden */ public templateService:TemplateService, private fonticon: TNSFontIconService) {
		super(elementRef,templateService);
	}

	/** @hidden
	 * <p>On Icon component initialization next things are heppening:</p>
	 * <ul>
	 * <li>Inititlaizing the properties and styling objects if not initialized and pass the external inputs to over write if any</li>
	 * <li>Binding the html template object to the passed properties object</li>
	 * </ul>
	 *
	 */
	ngOnInit() {
		// try{
		// 	console.log(this.configService.getConfiguration().templateURL);
		// }
		// catch(e)
		// {}
		if(this.notificationAction.observers.length > 0) this.notifacationClickable = 'notification-clickable';

		// this.activeTemplate = IconTemplates["defaultTemplate"];
		// if(this.compTemplate!=null && this.compTemplate!="")
		// {
		// 	if(IconTemplates[this.compTemplate]!=null)
		// 	{
		// 		this.activeTemplate = IconTemplates[this.compTemplate];
		// 	}
		// 	else
		// 		this.activeTemplate = this.compTemplate;
		// }
		
		this.getMyTemplate("icon",IconTemplates).then(() => {
			
			if(this.properties==null)
				this.properties = new IconModel(this.activeTemplate["property"]);
			else
			{
				var mainKeys = Object.keys(this.activeTemplate["property"]);
				if(this.properties.toggle!=null && this.activeTemplate["property"].toggle!=null)
				{
					var toggleKeys = Object.keys(this.activeTemplate["property"].toggle);
					for(let key of toggleKeys)
					{
						if(this.properties["toggle"][key]==null)
							this.properties["toggle"][key]=this.activeTemplate["property"]["toggle"][key];
					}
				} 
				for(let key of mainKeys)
				{
					if(this.properties[key]==null)
						this.properties[key]=this.activeTemplate["property"][key];
				}
			}
			if(this.styling==null)
				this.styling = new IconStylingModel(this.activeTemplate["style"]);
			if(this.display!=null) this.properties.display = this.display;
			if(this.name!=null) this.properties.name = this.name;

			if(this.properties.name.startsWith("fa-"))
				this.properties.type = "fa";
			else
				this.properties.type = "mi";
				
			if(this.size!=null) this.properties.size = this.size;

			this.cfIcon = this.properties;
            this.currentIcon = this.cfIcon;
			});
	}

	/** @hidden
	 * <p> Updating the properties object if any of the external inputs has been changed to keep the component dynamic.</p>
	 * @param changes <p> Changes that occured from the user.</p>
	 */
	ngOnChanges(changes: any){
		if(this.properties!=null)
		{
			if(changes.display!=null) this.properties.display = changes.display.currentValue;
			if(changes.name!=null)
			{ 
				this.properties.name = changes.name.currentValue;
				if(changes.name.currentValue.startsWith("fa-"))
					this.properties.type = "fa";
				else
					this.properties.type = "mi";
			}
			if(changes.size!=null) this.properties.size = changes.size.currentValue;
		}
	}

	/**@hidden */
	getIconClass(){
		if(this.styling!=null && this.styling.icon!=null&& this.cfIcon!=null)
		{
			var classes = "";
			if(this.checked==true)
			{
				try
				{
					var mainKeys = Object.keys(this.styling.icon.dynamicClass);
					for(let key of mainKeys){
					if(eval(this.styling.icon.dynamicClass[key])==true)
						classes = classes+" "+key;
					}
					return classes;
				}
				catch(e)
				{
					//Do nothing
				}
			}
			else
			{
				try
				{
					var mainKeys = Object.keys(this.styling.toggleIcon.icon.dynamicClass);
					for(let key of mainKeys){
					if(eval(this.styling.toggleIcon.icon.dynamicClass[key])==true)
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
	
	/**@hidden */
  getContainerClass(){
    if(this.styling!=null && this.styling.container!=null&& this.cfIcon!=null)
    {
		var classes = "";
		if(this.checked==true)
		{
			try
			{
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
		else
		{
			try
			{
				var mainKeys = Object.keys(this.styling.toggleIcon.container.class);
				for(let key of mainKeys){
				if(eval(this.styling.toggleIcon.container.class[key])==true)
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
}