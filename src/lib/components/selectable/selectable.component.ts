import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ContentChild, TemplateRef, HostBinding, SimpleChanges} from '@angular/core';
import { CfCoreComponent } from '../core/core.component';
import { SelectableModel } from '../../models/selectable/selectable.model';
import { SelectableStylingModel } from '../../models/selectable/selectable-styling.model';

import { TemplateService } from '../../services/template-service/template.service';

/**
 * <p>CF Selectable Component</p> 
 * <p>Selectable component can be Checkbox, Switch or Radio</p>
 * <pre>
 * <code>
 * import { SelectableModel } from 'cedrus-fusion'
 * import { CheckboxStylingModel } from 'cedrus-fusion' (in case of checkbox)
 * <code><</code>cf-checkbox<code>></code><code><</code><code>/</code>cf-checkbox<code>></code>
 * <code><</code>cf-switch<code>></code><code><</code><code>/</code>cf-switch<code>></code>
 * <code><</code>cf-radio<code>></code><code><</code><code>/</code>cf-radio<code>></code>
 * </code>
 * </pre>
 */
@Component({
  selector: 'cf-selectable',
  templateUrl: './lib/components/selectable/selectable.component.html',
  styleUrls: []
})
export class CfSelectableComponent extends CfCoreComponent implements OnInit {
	/**@hidden */
	@HostBinding('class') notifacationClickable = '';
	/**@hidden */
	selected: boolean;
	/**@hidden */
	internalId: number;
  	/**
	 * <pre>{
	 *  display: boolean,	// True or False <b>Default: True</b>
	 *  disable: boolean,	// True or False <b>Default: False</b>
	 *  value: string,			// Default: 'value'
	 *  item: any,			// item can be a string or any object to be put along side the control
	 *  checked: boolean,				// True or Fase <b>Default: False</b>
	 *  itemPosition: string	//Default: 'after'
	 *}
	 * </pre>
	 * <p>Example</p>
	 * <pre>{
	 *	value: 'pizza',
	 *	item: 'Pizza',
	 *	checked: true,
	 *	itemPosition: 'after'
	 *}
	 * </pre>
   */
	@Input() public properties: SelectableModel;
	
	/** 
	 * <p> The internal value of the selectable emitted when selected.</p>
	 * <p> Default is <b>value</b></p>
	 */
	@Input() public value: string;

	/**
	 * <p>Item can be a label or any other object based on the html template passed to the selectable</p>
	 */
	@Input() public item: any;

	/**
	 * <p> Checked or not checked</p>
	 * <p> Double binded variable to get or set the checked value of the selectable.</p>
	 * <p> Default is <b>false</b></p>
	 */
	@Input() get checked() { return this.selected; }

	/**
	 * <p>Item Position relative to the control</p>
	 * <p>Options : 'before' , 'after'</p>
	 * <p>Default <b>after</b>
	 */
	@Input() public itemPosition: string;

	/**@hidden */
	@Output() checkedChange = new EventEmitter();
	/**@hidden */
	@Output() clicked = new EventEmitter();
	/**@hidden */
	set checked(val) {
		this.selected = val;
		this.checkedChange.emit(this.selected);
		if(this.properties!=null)
			this.properties.checked = this.selected;
	}
	/**@hidden
	 * It is function for creating Notification click events by using Core Component <b>notificationAction</b> event emmiter.
  	 * @param notification	it is json notification object
	 */
	cfNotificationAction(notification) { 
		this.notificationAction.emit(notification); 
	}
	/**@hidden */
	constructor(public elementRef: ElementRef,/**@hidden */ templateService:TemplateService) { super(elementRef, templateService); }
	/**@hidden
   * It will be generated <b>cfCheckbox</b> object and rendered inside component template. Also cfCheckStates function will initialize checkboxes states.
   */
	ngOnInit() { 
		if(this.notificationAction.observers.length > 0) this.notifacationClickable = 'notification-clickable';
	}
	/**@hidden */
	notifyGroup(){
		this.clicked.emit({"id":this.internalId, "value": this.selected});
	}
	/**@hidden */
	updateFromGroup(val: boolean)
	{
		this.checked = val;
	}
}