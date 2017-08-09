import { Component, ElementRef, OnInit, Input, Output, EventEmitter, ContentChildren, QueryList } from '@angular/core';
import { CfCoreComponent } from '../core/core.component';
import { ListModel } from '../../models/list/list.model';
import { ListStylingModel } from '../../models/list/list-styling.model';
import { CfItemComponent } from '../item/item.component';
import { ListTemplates } from '../../templates/list.template';

import { TemplateService } from '../../services/template-service/template.service';
/**
 * <p>List component based on Angular Material List</p>
 * <p>Example of using:</p>
 * <pre>
 * <code><</code>cf-wizard [properties]="myList" [styling]="myListStyles"<code>></code><code><</code><code>/</code>cf-list<code>></code>
 * </pre>
 */
@Component({
	selector: 'cf-list',
	templateUrl: './lib/components/list/list.component.html',
	styleUrls: ['./lib/components/list/list.component.css']
})
export class CfListComponent extends CfCoreComponent implements OnInit {
	/**
   * It is an ListModel object with options to be rendered into component template
   */
	cfList: ListModel;
	/**
   * It is an attribute <b>[properties]</b> of directive <b>cf-list</b> which take ListModel object.
   * <p>Example of model:</p>
   * <pre>{
   *  title: 'This is list title'
   * }</pre>
   * <h4>title: string</h4>
   * It is title for List component
   */
	@Input() public properties: ListModel;
	/**
   * It is an attribute <b>[styling]</b> of directive <b>cf-list</b> which take ListStylingModel object with next properties:
   * <h4>container: StylingModel</h4>
   * Styling properties for main wizard container
   */
	@Input() public styling: ListStylingModel;
	/**
	 * Input property for the title
	 */
	@Input() title: string;
	/**
	 * Input property for selectable
	 */
	@Input() selectable: boolean = false;
	/**
	 * Input property to show checkbox on list items
	 */
	@Input() withCheckbox: boolean = true;
	/**
	 * Array for selected items IDs
	 */
	selectedItems: number[] = [];
	/**
   * It is <b>(onSelect)</b> attribute of <b>cf-list</b> component. Is emmiting event with array of selected items IDs
   */
	@Output() onSelect = new EventEmitter();
	/**
	 * Private property for generating IDs for list items when list is selectable
	 */
	randomId: number = 0;

	constructor(public elementRef: ElementRef,/**@hidden */ templateService:TemplateService) { super(elementRef, templateService); }
	/**
   * It will be generated <b>cfList</b> object and rendered inside component template. Also cfListToggleClasses array will be initialized to build each item details toggle icon.
   */
	ngOnInit(): void {

		this.getMyTemplate("list",ListTemplates).then(() => {
		if(this.properties==null)
			this.properties = new ListModel(this.activeTemplate.property);
		if(this.styling==null)
			this.styling = new ListStylingModel(this.activeTemplate.style);
		
		if(this.disable!=null) this.properties.disable = this.disable;
		if(this.display!=null) this.properties.display = this.display;
		if(this.title!=null) this.properties.title = this.title;
		this.cfList = this.properties;
		});
	}
	/**
	 * Angular core function to listen for component properties changes
   * @param changes  it is object with changed properties
	 */
	ngOnChanges(changes: any) {
		if(this.properties!=null && this.styling!=null)
		{
			if(changes.disable!=null) this.properties.disable = changes.disable.currentValue;
			if(changes.display!=null) this.properties.display = changes.display.currentValue;
			if(changes.title!=null) this.properties.title = changes.title.currentValue;
		}
	}
	/**
	 * Array with list items
	 */
	@ContentChildren(CfItemComponent) items: QueryList<CfItemComponent>;
	/**
	 * After List content was initialized and component is selectable, will be generated IDs for all list items and each selected item ID will be pushed to selectedItems array.
	 */
	ngAfterContentInit() {
		if(this.items!=null && this.items.length>0)
		{
			if(this.selectable!=false)
			{
				for(let item of this.items.toArray())
				{
					item.internalId = this.randomId;
					this.randomId++;
					if(item.selected==true)
					{
						this.selectedItems.push(item.internalId);
					}
					console.log(this.withCheckbox);
					setTimeout(_ => 
									item.selectable = true,
									item.itemClicked.subscribe(data=> this.updateValues(data))
					);
					if(this.withCheckbox!=true)
					{
						item.withCheckbox = false;
					}
				}
			}
		}
	}
	/**
	 * Function to update selectedItems array values and emit them 
   * @param data  item data object
	 */
	updateValues(data)
	{
		if(data["value"]==true)
		{
			this.selectedItems.push(data["id"]);
			this.selectedItems.sort();
			this.onSelect.emit(this.selectedItems);
		}
		else
		{
			this.selectedItems.splice(this.selectedItems.indexOf(data["id"]),1);
			this.onSelect.emit(this.selectedItems);
		}
	}
}