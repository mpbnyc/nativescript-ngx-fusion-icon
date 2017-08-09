import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ContentChild, TemplateRef, HostBinding,forwardRef } from '@angular/core';
import { CfSelectableComponent } from '../selectable/selectable.component';
import { SelectableModel } from '../../models/selectable/selectable.model';
import { SwitchStylingModel } from '../../models/selectable/switch-styling.model';
import { SwitchTemplates } from '../../templates/switch.template';

import { TemplateService } from '../../services/template-service/template.service';

/**
 * <p>CF Switch Component</p> 
 * <pre>
 * <code>
 * import { SelectableModel } from 'cedrus-fusion'
 * import { SwitchStylingModel } from 'cedrus-fusion'
 * <code><</code>cf-switch<code>></code><code><</code><code>/</code>cf-switch<code>></code>
 * </code>
 * </pre>
 */
@Component({
  selector: 'cf-switch',
  templateUrl: './lib/components/switch/switch.component.html',
  styleUrls: ['./lib/components/switch/switch.component.css'],
  providers: [{provide: CfSelectableComponent, useExisting: forwardRef(() => CfSwitchComponent)}]
})
export class CfSwitchComponent extends CfSelectableComponent implements OnInit {
	
	/**@hidden*/
	@HostBinding('class') notifacationClickable = '';

	/**@hidden
	 * Component property for rendering template for each switch if that template was defined in html.
	 */
	@ContentChild(TemplateRef) cfSwitchTemplate;

	/**@hidden */
	cfSwitch: SelectableModel;

	/**
	  *<p> dynamicClass: function() -> string,	// Function that returns name of the class </p>
		*<p> class: string												// Name of the css class selector </p>
		*<p> themeColor: string										// primary/accent/warn </p>
	  *<pre>
		*{
	  *	// Container surrounding the Switch
	  *	container:{
	  *		dynamicClass,
	  *		class
	  *	},
	  *	// md-switch styling
	  *	switch:{
	  *		dynamicClass,
	  *		class,
	  *		themeColor
	  *	}
	  *}
	  * </pre>
	  */
	@Input() public styling: SwitchStylingModel;
			item: string = "<Label text='go blow yourself'></Label>"
	/**@hidden */
	constructor(/**@hidden */public elementRef: ElementRef,/**@hidden */ templateService:TemplateService) { super(elementRef, templateService); }

	/**@hidden
     * It will be generated <b>cfCheckbox</b> object and rendered inside component template. Also cfCheckStates function will initialize checkboxes states.
     */
	ngOnInit() { 
  		this.getMyTemplate("switch",SwitchTemplates).then(() => {
			if(this.properties==null)
			{
				this.properties = new SelectableModel(this.activeTemplate["property"]);
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
				this.styling = new SwitchStylingModel (this.activeTemplate["style"]);
			if(this.disable!=null) this.properties.disable = this.disable;
			if(this.display!=null) this.properties.display = this.display;
			if(this.value!=null) this.properties.value = this.value;
			if(this.item!=null) this.properties.item = this.item;
			if(this.checked!=null) this.properties.checked = this.checked;
			if(this.itemPosition!=null) this.properties.itemPosition = this.itemPosition;

			this.checked = this.properties.checked;
			
			this.cfSwitch = this.properties;
		});
	}

	/**@hidden */
	ngOnChanges(changes: any){
		if(this.properties!=null)
		{
			if(changes.disable!=null) this.properties.disable = changes.disable.currentValue;
			if(changes.display!=null) this.properties.display = changes.display.currentValue;
			if(changes.checkedValue!=null) this.properties.value = changes.value.currentValue;
			if(changes.item!=null) this.properties.item = changes.item.currentValue;
			if(changes.itemPosition!=null) this.properties.itemPosition = changes.itemPosition.currentValue;
		}
	}
	/**@hidden */
	getSwitchClass(){
    if(this.styling!=null && this.styling.switch!=null&& this.cfSwitch!=null)
    {
      try
      {
        var classes = "";
        var mainKeys = Object.keys(this.styling.switch.dynamicClass);
        for(let key of mainKeys){
          if(eval(this.styling.switch.dynamicClass[key])==true)
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
    if(this.styling!=null && this.styling.container!=null&& this.cfSwitch!=null)
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