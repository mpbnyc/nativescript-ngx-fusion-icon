import { Component, ElementRef, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { FabModel } from '../../models/fab/fab.model';
import { FabButtonModel } from '../../models/fab/fab-button.model';
import { CfCoreComponent } from '../core/core.component';
import { FabTemplates } from '../../templates/fab.template';

import { TemplateService } from '../../services/template-service/template.service';


/**
 * <p>CF Fab Component</p> 
 * <pre>
 * <code>
 * import { FabButtonModel } from 'cedrus-fusion'
 * <</code>cf-fab<code>></code><code><</code><code>/</code>cf-fab<code>>
 * </code>
 * </pre>
 */
@Component({
  selector: 'cf-fab',
  templateUrl: './lib/components/fab/fab.component.html',
  styleUrls: ['./lib/components/fab/fab.component.css']
})
export class CfFabComponent extends CfCoreComponent implements OnInit {
  
  /**@hiddden
   * It is property to attach notification class when component has notifications actions.
   */
  @HostBinding('class') notifacationClickable = '';

  /** @hidden
   * <p>It is Object which will recive data from <b>FabModel</b> Class. It is used in <b>cf-fab</b> template.</p>
   * <p>Example:</p>
   * <pre>{
   *  direction: "down",
   *  showButtons: true,
   *  stayOpened: true,
   *  triggerButton: { icon: {name: 'fa-gear'} },
   *  actionButtons: [
   *    { icon: {name:"fa-apple"}, display: this.shown },
   *    { icon: {name:"fa-star"}, label: "Item", labelPosition: "left" },
   *    { icon: {name:"fa-home"}, disable: this.disabled }
   *  ]
   * }</pre>
   * <h4>direction: string</h4>
   * It is direction of opening Fab action buttons. Optional. Default must be set in file: /src/assets/settings/fab/settings.ts. Can be: 'up', 'right', 'down', 'left'.
   * <h4>showButtons: boolean</h4>
   * It set if Fab action buttons must be shown on init. Optional. Default is false. 
   * <h4>stayOpened: boolean</h4>
   * It is icon constructor, which take string values from Fab Component and create Fab object.
   * <h4>triggerButton: FabButtonModel</h4>
   * It is data for Fab trigger button based on FabButtonModel. Optional, but then must be set in file describet above. 
   * <h4>actionButtons: FabButtonModel[]</h4>
   * It is an array of buttons with type FabButtonModel. Optional.
   */
  cfFab: FabModel;

  /**
	 * <pre>{
	 *  direction: string, // Default: 'down', Possible: 'down', 'up', 'right', 'left'
   *  triggerButton: FabButtonModel,
	 *  actionButtons: FabButtonModel[],
	 *  showButtons: boolean, //Default: false
   *  stayOpened: boolean //Default: false
	 * }
	 * </pre>
	 */

  buttons: any = [1,2,3];
  @Input() public properties: FabModel;

  /**
   * <p>Event to call when Fab trigger button was clicked</p>
   */
  @Output() cfTriggerEvent: EventEmitter<any> = new EventEmitter<any>();

  /**
   * <p>Event to call when Fab action button was clicked</p>
   */
  @Output() cfActionButtonEvent: EventEmitter<any> = new EventEmitter<any>();

  /**@hidden
   * <p>It is function to send event with Fab trigger button object when it was clciked.</p>
   * <p>Example of event object:</p>
   * @param item      it is trigger button object
   */
  coreTriggerEvent(fab: Object) { this.cfTriggerEvent.emit(fab); }

  /**@hidden
   * <p>It is function to send event with Fab action button object when it was clciked.</p>
   * <p>Example of event object:</p>
   * @param index      it is index of action button
   * @param item      it is action button object
   */
  coreActionEvent(fab: Object) { this.cfActionButtonEvent.emit(fab); }

  /**@hidden */
  public constructor(/**@hidden*/public elementRef: ElementRef,/**@hidden */ templateService:TemplateService) { super(elementRef, templateService); }

  /**@hidden
   * It will be generated <b>cfFab</b> object and rendered inside component template.
   */
  
  // ngOnInit(){
  //   var opt = {};
  //   Object.assign(opt, FabTemplates.defaultTemplate.property,this.properties);
  //   this.cfFab = opt;
  //   // if(this.notificationAction.observers.length>0) this.notifacationClickable = 'notification-clickable';    
  // }

  ngOnInit(): void {
		if(this.notificationAction.observers.length > 0) this.notifacationClickable = 'notification-clickable';

    //this.getMyTemplate("fab",FabTemplates).then(() => {
  		this.activeTemplate = FabTemplates["defaultTemplate"];
		if(this.compTemplate!=null && this.compTemplate!="")
		{
			if(FabTemplates[this.compTemplate]!=null)
			{
				this.activeTemplate = FabTemplates[this.compTemplate];
			}
			else
				this.activeTemplate = this.compTemplate;
		}
		if(this.properties==null)
    	{
			this.properties = new FabModel(this.activeTemplate["property"]);
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

		if(this.display!=null) this.properties.display = this.display;
    if(this.disable!=null) this.properties.disable = this.disable;

		this.cfFab = this.properties;
    //});
	}
}