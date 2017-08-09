import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ContentChild, TemplateRef, HostBinding, SimpleChanges, forwardRef} from '@angular/core';
import { CfSelectableComponent } from '../selectable/selectable.component';
import { SelectableModel } from '../../models/selectable/selectable.model';
import { CheckboxStylingModel } from '../../models/selectable/checkbox-styling.model';
import { CheckboxTemplates } from '../../templates/checkbox.template';

import { TemplateService } from '../../services/template-service/template.service';


/**
 * <p>CF Checkbox Component</p> 
 * <pre>
 * <code>
 * import { SelectableModel } from 'cedrus-fusion'
 * import { CheckboxStylingModel } from 'cedrus-fusion'
 * <code><</code>cf-checkbox<code>></code><code><</code><code>/</code>cf-checkbox<code>></code>
 * </code>
 * </pre>
 */
@Component({
  selector: 'cf-checkbox',
  templateUrl: './lib/components/checkbox/checkbox.component.html',
  styleUrls: ['./lib/components/checkbox/checkbox.component.css'],
  providers: [{provide: CfSelectableComponent, useExisting: forwardRef(() => CfCheckboxComponent)}]
})

export class CfCheckboxComponent extends CfSelectableComponent implements OnInit {
	
	/** @hidden
	 * Component property for rendering template for each checkbox if that template was defined in html.
	 */
	@ContentChild(TemplateRef) cfCheckboxTemplate;

	/**@hidden */
	cfCheckbox: SelectableModel;

	/**
	  *<p> dynamicClass: function() -> string,	// Function that returns name of the class </p>
		*<p> class: string												// Name of the css class selector </p>
		*<p> themeColor: string										// primary/accent/warn </p>
	  *<pre>
		*{
	  *	// Container surrounding the Checkbox/Switch/Radio
	  *	container:{
	  *		dynamicClass,
	  *		class
	  *	},
	  *	// md-checkbox or md-switch or md-radio styling
	  *	checkbox/switch/radio:{
	  *		dynamicClass,
	  *		class,
	  *		themeColor
	  *	}
	  *}
	  * </pre>
	  */
	@Input() public styling: CheckboxStylingModel;
	
	/**@hidden */
	constructor(/**@hidden */public elementRef: ElementRef,/**@hidden */ templateService:TemplateService) { super(elementRef, templateService); }
	
	/**@hidden
     * It will be generated <b>cfCheckbox</b> object and rendered inside component template. Also cfCheckStates function will initialize checkboxes states.
     */
	ngOnInit() { 
  		this.getMyTemplate("checkbox",CheckboxTemplates).then(() => {
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
				this.styling = new CheckboxStylingModel (this.activeTemplate["style"]);
			if(this.disable!=null) this.properties.disable = this.disable;
			if(this.display!=null) this.properties.display = this.display;
			if(this.value!=null) this.properties.value = this.value;
			if(this.item!=null) this.properties.item = this.item;
			if(this.checked!=null) this.properties.checked = this.selected;
			if(this.itemPosition!=null) this.properties.itemPosition = this.itemPosition;

			this.checked = this.properties.checked;
			this.cfCheckbox = this.properties;
		});
	}

	/**@hidden */
	ngOnChanges(changes: any){
		if(this.properties!=null)
		{
			if(changes.disable!=null) this.properties.disable = changes.disable.currentValue;
			if(changes.display!=null) this.properties.display = changes.display.currentValue;
			if(changes.value!=null) this.properties.value = changes.value.currentValue;
			if(changes.item!=null) this.properties.item = changes.item.currentValue;
			if(changes.itemPosition!=null) this.properties.itemPosition = changes.itemPosition.currentValue;
		}
	}
	/**@hidden */
	getCheckboxClass(){
    if(this.styling!=null && this.styling.checkbox!=null&& this.cfCheckbox!=null)
    {
      try
      {
        var classes = "";
        var mainKeys = Object.keys(this.styling.checkbox.dynamicClass);
        for(let key of mainKeys){
          if(eval(this.styling.checkbox.dynamicClass[key])==true)
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
    if(this.styling!=null && this.styling.container!=null&& this.cfCheckbox!=null)
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