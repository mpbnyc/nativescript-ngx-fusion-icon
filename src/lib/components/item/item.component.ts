import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { CfCoreComponent } from '../core/core.component';
import { CfCheckboxComponent } from '../checkbox/checkbox.component';

import { ItemStylingModel } from '../../models/item/item-styling.model';
import { ItemTemplates } from '../../templates/item.template';

import { TemplateService } from '../../services/template-service/template.service';

@Component({
	selector: 'cf-item',
	templateUrl: './lib/components/item/item.component.html',
	styleUrls: ['./lib/components/item/item.component.css']
})

/**
 * <p> The item component can be used anywhere as a general item or inside cf-list component as a list item.</p>
 * <p> The item component consists of 2 tabs: Default template (always shown) and the details template.</p>
 */
export class CfItemComponent extends CfCoreComponent implements OnInit {
	
	@Input()
	styling: ItemStylingModel;
	/**
	 * <p> True if the item will contain a details tab.</p>
	 */
	@Input() details:boolean = false;

	selectedValue: boolean  = false;

	/**
	 * <p> If the item is selectable, then show a checkbox</p>
	 */
	@Input() selectable: boolean = false;
	@Input() withCheckbox: boolean = true;

	@Input() get selected() { return this.selectedValue; }
	@Output() selectedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

	@Output() itemClicked = new EventEmitter();

	set selected(val)
	{
		this.selectedValue = val;
		this.selectedChange.emit(this.selectedValue);
	}

	internalId: number;

	/**
	 * <p> Set to true when the user presses on the details icon.</p>
	 */
	showDetails: boolean = false;
	
	constructor(public elementRef: ElementRef,/**@hidden */ templateService:TemplateService) {
		super(elementRef, templateService);
	}

	ngOnInit() {
		this.getMyTemplate("item",ItemTemplates).then(() => {
		if(this.styling==null)
		{
			this.styling = new ItemStylingModel (this.activeTemplate["style"]);
		}
		});
	}

	ngOnChanges(changes: any){
	}

	@ViewChild(CfCheckboxComponent) checkbox: CfCheckboxComponent;

	selectMe() {
		if(this.selectable==true)
		{
			this.selected = !this.selected;
			this.itemClicked.emit({"id":this.internalId, "value": this.selectedValue});
		}
	}

	notifyList(){
		if(this.selectable==true)
		{
			this.itemClicked.emit({"id":this.internalId, "value": !this.selectedValue});
		}
	}
}