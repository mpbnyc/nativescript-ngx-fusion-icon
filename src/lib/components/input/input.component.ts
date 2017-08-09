import { Component, OnInit, Input, Output, ElementRef, HostBinding, EventEmitter, forwardRef } from '@angular/core';
import { CfCoreComponent } from '../core/core.component';
import { IconModel } from '../../models/icon/icon.model';
import { InputModel } from '../../models/input/input.model';
import { InputStylingModel } from '../../models/input/input-styling.model';
import { InputTemplates } from '../../templates/input.template';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS,FormControl } from '@angular/forms';

import { TemplateService } from '../../services/template-service/template.service';


/**
 * <p>CF Icon Component</p> 
 * <pre>
 * <code>
 * import { InputModel } from 'cedrus-fusion'
 * import { InputStylingModel } from 'cedrus-fusion'
 * <code><</code>cf-input<code>></code><code><</code><code>/</code>cf-input<code>></code>
 * </code>
 * </pre>
 */

// export function validateCfInput(c: FormControl) {
// 	let err = {
// 		rangeError: {
// 			given: c.value
// 		}
// 	};

//   return (c.value == null)? err: null;
// }
@Component({
  selector: "cf-input",
  template: `
<StackLayout>
    <StackLayout class="container" orientation="horizontal" borderBottomWidth="2" borderBottomColor="blue" margin="0 5 0 5">
        <cf-icon class="lower" [cfIcon]="myFusionIcon" *ngIf="iconPosition==='left'"></cf-icon>
        <TextField width="100%" [(ngModel)]="value" [hint]="placeholder" [maxLength]="cfInput.maxlength" backgroundColor="transparent" borderColor="transparent" paddingBottom="0" borderBottomWidth="0" [width]="iconPosition === 'right' ? '88%' : '100%'">
            <FormattedString [maxLength]="cfInput.maxlength">
                <Span [maxLength]="cfInput.maxlength"></Span>
            </FormattedString>
        </TextField>
        <cf-icon [cfIcon]="myFusionIcon" *ngIf="iconPosition==='right'"></cf-icon>
    </StackLayout>
</StackLayout>  
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CfInputComponent),
      multi: true
    }
  ]
})

export class CfInputComponent extends CfCoreComponent implements OnInit,ControlValueAccessor {
	
	/**@hidden */
	writeValue(obj: any): void {
		if (obj) {
			this.value = obj;
		}
	}
	/**@hidden */
	registerOnChange(fn: any): void {
		this.onChange = (value) => { Promise.resolve(null).then(() => fn(value)) };
	}
	/**@hidden */
	registerOnTouched(fn: any): void {
		this.onTouched = (value) => { Promise.resolve(null).then(() => fn(value)) };
	}
	/**@hidden */
	setDisabledState(isDisabled: boolean): void {
	}

	/**@hidden */
	onChange: any = () => { };
	/**@hidden */
  	onTouched: any = () => { };
	/**@hidden */
	@HostBinding('class') notifacationClickable = '';

	/**@hidden
	 * It is Input object which will recive values provided by InputClass Class and after that <b>md-input</b> will be builded on page.
	 */
	cfInput: InputModel;

	/**@hidden */
	private val: string;
	
	
	
	/**
	 * <pre>{
	 *  display: boolean, // Default: True
   	 *  disable: boolean, // Default: False
	 *  type: string, // Default: 'text'
   	 *  placeholder: string,
     *  hint: object,
	 *  text: string,
	 *  align: string //Default: 'start'
	 *  prefix: string,
	 *  suffix: string,
	 *  dividerColor: string,
	 *  value: any,
	 *  maxlength: number,
	 *  iconProperty : IconModel,
	 *  menu: MenuModel
	 * }
	 * </pre>
	 */
	@Input()
	public properties: InputModel;

     /**
	  * <pre>{
	  * // styling of the container surrounding the input
	  * container: {
	  *		dynamic class: function() -> string, //function that returns a string of the name of the class
	  *		class: string //name of the class specified in you scss/css file
	  *	},
	  * // styling of the input
	  * input: {
	  *		dynamic class: function() -> string, 
	  *		class: string ,
	  *		themeColor: string , // primary/accent/warn
	  * },
	  * hint: {
	  *		dynamic class: function() -> string, 
	  *		class: string ,
	  *		themeColor: string , // primary/accent/warn
	  * },
	  * iconStyling: IconStylingModel, //refer to icon component
	  * menuStyling: MenuStylingModel, //refer to menu component 
	  *}
	  * </pre>
	  */
	@Input()
	public styling: InputStylingModel;

 	/** @hidden
	 * It is function for creating Notification click events by using Core Component <b>notificationAction</b> event emmiter.
     * @param notification	it is json notification object
	 */
	cfNotificationAction(notification) {
		this.notificationAction.emit(notification);
	}

	/**
	 * <p> Type of the input if text or password.</p>
	 */
	@Input() type: string;

	/**
	 * <p>Placeholder of the input.</p>
	 */
	@Input() placeholder: string;

	/**
	 * <p> The hint under the input.</p>
	 */
	@Input() hintText: string;

	/**@hidden
	 * <p> The value inside the input (double bound).</p>
	 */
	@Input() public get value() { return this.val; }

	/**
	 * <p> The icon name of the input if exists.</p>
	 */
	@Input() iconName: string;

	/**
     * <p> The event that will be called when the value is changed.</p>
     */
	@Output() valueChange = new EventEmitter();

	/**@hidden */
	public set value(value) {
		this.val = value;
		if(this.cfInput)
			this.cfInput.value = value;
		this.valueChange.emit(this.val);
		this.onChange(value);
		this.onTouched();
	}

	/**@hidden */
	public resetInput(){
		this.value = "";
	}

	/**@hidden */
	constructor(/**@hidden */public elementRef: ElementRef,/**@hidden */ templateService:TemplateService) {
		super(elementRef, templateService);
	}

	/**@hidden */
	ngOnInit() {
		super.ngOnInit();

		if(this.notificationAction.observers.length > 0) this.notifacationClickable = 'notification-clickable';
		
		this.getMyTemplate("input",InputTemplates).then(() => {
			if(this.properties==null)
			{
				this.properties = new InputModel(this.activeTemplate["property"]);
			}
			else
			{
				var mainKeys = Object.keys(this.activeTemplate["property"]);
				for(let key of mainKeys)
				{
					if(this.properties[key]==null && key!="iconProperty")
						this.properties[key]=this.activeTemplate["property"][key];
				}
			}

			if(this.styling==null)
				this.styling = new InputStylingModel (this.activeTemplate["style"]);
			if(this.disable!=null) this.properties.disable = this.disable;
			if(this.display!=null) this.properties.display = this.display;
			if(this.value!=null) this.properties.value = this.value;
			if(this.type!=null) this.properties.type = this.type;
			if(this.placeholder!=null) this.properties.placeholder = this.placeholder;
			if(this.hintText!=null)
			{
				if(this.properties.hint==null)
					this.properties.hint = { text: "", align:"end"};
				this.properties.hint.text = this.hintText;
			}
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

			this.cfInput = this.properties;
		});
	}

	/**@hidden
	 * <p> Update the properties object with hte latest inputs on change to keep the component dynaic.</p>
	 * @param changes
	 */
	ngOnChanges(changes: any) {
		if(this.properties!=null)
		{
			if(changes.disable!=null) this.properties.disable = changes.disable.currentValue;
			if(changes.display!=null) this.properties.display = changes.display.currentValue;
			if(changes.value!=null) this.properties.value = changes.value.currentValue;
			if(changes.type!=null) this.properties.type = changes.type.currentValue;
			if(changes.placeholder!=null) this.properties.placeholder = changes.placeholder.currentValue;
			if(changes.hintText!=null)
			{
				if(this.properties.hint==null)
					this.properties.hint = { text: "", align:"end"};
				this.properties.hint.text = changes.hintText.currentValue;
			}
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
}