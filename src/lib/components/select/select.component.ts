import { Component, OnInit, Input, Output, EventEmitter, ElementRef, HostBinding, forwardRef } from '@angular/core';
import { CfCoreComponent } from '../core/core.component';
import { SelectModel } from '../../models/select/select.model';
import { SelectStylingModel } from '../../models/select/select-styling.model';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';
import { SelectTemplates } from '../../templates/select.template';

import { TemplateService } from '../../services/template-service/template.service';

/**
 * <p>CF Select Component</p> 
 * <pre>
 * <code>
 * import { SelectModel } from 'cedrus-fusion'
 * import { SelectStylingModel } from 'cedrus-fusion'
 * <code><</code>cf-select<code>></code><code><</code><code>/</code>cf-select<code>></code>
 * </code>
 * </pre>
 */
@Component({
  selector: 'cf-select',
  templateUrl: './lib/components/select/select.component.html',
  styleUrls: ['./lib/components/select/select.component.css'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CfSelectComponent),
      multi: true
    }
  ]
})

export class CfSelectComponent extends CfCoreComponent implements OnInit {
	
  /**@hidden */
  writeValue(obj: any): void {
		if (obj) {
      if(this.cfSelect!=null)
			  this.cfSelect["selected"] = obj;
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
   * <p>It is Object which will recive data from <b>SelectModel</b> Class. It is used in <b>cf-select</b> template.</p>
   * <p>Example of <b>SelectModel</b> Class:</p>
   * <pre>{
   *  placeholder: 'Select fruit: ',
   *  items: [
   *      { value: 'apl', label: 'Apple' },
   *      { value: 'ban', label: 'Banana' },
   *      { value: 'che', label: 'Cherry' }       
   * ],
   *  itemValue: 'value',
   *  itemLabel: 'label',
   *  selected: 'che',
   *  showFilter: false,
   * }</pre>
   * <h4>placeholder: string</h4>
   * <p>It is Select placeholder text.</p>
   * <h4>items: Array</h4>
   * <p>It is an Array with items. Each item is an Object with at least two properties to be used in Select template.</p>
   * <h4>itemValue: string</h4>
   * It is name of item property, which will be used as value for <b>md-option</b>. Each item value type of that property can be only logically correct.
   * <h4>itemLabel: string</h4>
   * It is name of item property, which will be used as displaying text for <b>md-option</b> and by this property filtering system is working. Each item value type of that property can be only logically correct. Also HTML values are possible.
   * <h4>selected: any</h4>
   * It is 'itemValue' of one of the items and that item will be selected.
   * <h4>showFilter: Boolean</h4>
   * It show/hide Filter in dropdown list.
   */
  cfSelect: SelectModel;

  /**
   * <p>Value of the Filter input by which whole dropdown list items will be filtered<p>
   */
  cfFilterBy: string = '';

  /**
	 * <pre>{
	 *  display: boolean, // Default: True
   *  disable: boolean, // Default: False
	 *  items: SelectItemModel[],
   *  selected: string,
   *  placeholder: string,
   *  showFilter: boolean,
   *  required: boolean
	 * }
	 * </pre>
	 */
  @Input() public properties: SelectModel;

  /**
	  * <pre>{
	  * // styling of the container surrounding the select
	  * container: {
	  *		dynamic class: function() -> string, //function that returns a string of the name of the class
	  *		class: string //name of the class specified in you scss/css file
	  *	},
	  * // styling of the select
	  * select: {
	  *		dynamic class: function() -> string, 
	  *		class: string ,
	  *		themeColor: string , // primary/accent/warn
	  * },
	  * filter: {
	  *		dynamic class: function() -> string, 
	  *		class: string 
	  * },
    * options: {
	  *		dynamic class: function() -> string, 
	  *		class: string 
	  * }
	  *}
	  * </pre>
	  */
  @Input() public styling: SelectStylingModel;

  /**
   *<p> If select is required</p>
   */
  @Input() public required: Boolean = false;

  /**
   * <p>Event to call when Select dropdown list was opened</p>
   */
  @Output() cfOnOpen = new EventEmitter<any>();

  /**
   * <p>Event to call when value of Select was changed</p>
   */
  @Output() cfOnChange = new EventEmitter<any>();

  /**
   * <p>Event to call when Select dropdown list was closed</p>
   */
  @Output() cfOnClose = new EventEmitter<any>();

  /**@hidden
   * It is method which will emit corresponding event when Select dropdown list was opened.
   */
  cfSelectOpened() { this.cfOnOpen.emit(); }
  
  /**hidden
   * It is method which will emit corresponding event when value of Select was changed.
   */
  cfSelectChanged() { 
    this.cfOnChange.emit(this.cfSelect["selected"]); 
		this.onChange(this.cfSelect["selected"]);
		this.onTouched();
  }
  
  /**hidden
   * It is method which will emit corresponding event when Select dropdown list was closed.
   */
  cfSelectClosed() { this.cfOnClose.emit(); }
  
  /**hidden
   * It is function for creating Notification click events by using Core Component <b>notificationAction</b> event emmiter.
   * @param notification    it is json notification object
   */
  cfNotificationAction(notification) { 
    this.notificationAction.emit(notification); 
  }

  /**@hidden */
  resetSelect() {
    this.cfSelect.selected = "";
    this.cfSelectChanged();
  }

  /**@hidden */
  constructor(  /**@hidden */public elementRef: ElementRef,/**@hidden */ templateService:TemplateService) { super(elementRef, templateService); }
  
  /**@hidden
   * It will be generated <b>cfSelect</b> object and rendered inside component template.
   */
  ngOnInit() { 
    if(this.notificationAction.observers.length > 0) this.notifacationClickable = 'notification-clickable';

  	this.getMyTemplate("select",SelectTemplates).then(() => {
      if(this.properties==null)
        this.properties = new SelectModel(this.activeTemplate["property"]);
      if(this.styling==null)
        this.styling = new SelectStylingModel(this.activeTemplate["style"]);
      this.cfSelect = this.properties; 
    });
  }
}