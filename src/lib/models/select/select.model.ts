import { CoreModel } from '../core/core.model';
import { SelectItemModel } from './select-item.model';

export class SelectModel extends CoreModel {

	/**
	 * <p>Array with option items</p>
	 */
	items: SelectItemModel[] = [];

	/**
	 * <p>Select component must have some selected item and it is value of item property described in <b>itemValue</b></p>
	 */
	selected: any = '';

	/**
	 * <p>Placeholder text</p>
	 */
	placeholder: string = '';

	/**
	 * <p>Show/Hide filter</p>
	 */
	showFilter: Boolean = false;

	/**@hidden
	 * It is icon constructor, which take values from Select Component and create Select Model object.
	 */
	constructor(values: Object = {}) {
		super(values);
		Object.assign(this, values);
	}
}