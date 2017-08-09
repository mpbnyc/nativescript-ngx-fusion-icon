import { CoreModel } from '../core/core.model';

export class ListModel extends CoreModel {
	/**
	 * It is title for the Component.
	 */
	title?: string;
	/**
	 * It is icon constructor, which take values from List Component and create List Model object.
	 */
	constructor(values: Object = {}) {
		super(values);
		Object.assign(this, values);
	}
}