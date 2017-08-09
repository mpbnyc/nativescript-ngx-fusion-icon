import { CoreModel } from '../core/core.model';
/**
 * <h4>Example of Selectable Model:</h4>
 * <pre>{
 *	value: 'value',
 *	item: any,
 *	checked: false,
 *	itemPosition: 'after'
 *}
 * </pre>
 */

export class SelectableModel extends CoreModel {
	
	/** 
	 * <p> The internal value of the selectable emitted when selected.</p>
	 * <p> Default is <b>value</b></p>
	 */
	value?: string = 'value';

	/**
	 * <p>Item can be a label or any other object based on the html template passed to the selectable</p>
	 */
	item?: any;

	/**
	 * <p> Checked or not checked</p>
	 * <p> Default is <b>false</b></p>
	 */
	checked?: boolean = false;

	/**
	 * <p>Item Position relative to the control</p>
	 * <p>Options : 'before' , 'after'</p>
	 * <p>Default <b>after</b>
	 */
	itemPosition?: string = 'after';

	/** @hidden
	 * It is icon constructor, which take values from selectable Component and create selectable Model object.
	 */
	constructor(values: Object = {}) {
		super(values);
		Object.assign(this, values);
		if(this.item==null)
			this.item = "";
	}
}