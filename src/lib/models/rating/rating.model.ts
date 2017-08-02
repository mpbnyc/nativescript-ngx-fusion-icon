import { CoreModel } from '../core/core.model';

export class RatingModel extends CoreModel {
	/**
	 * Label for component
	 */
	label: string;
	/**
	 * Name of icon
	 */	
	icon: string;
	/**
	 * Value of rating and means number of filled/selected icons
	 */
	value: number;
	/**
	 * Number of rating icons
	 */
	max: number;
	/**
	 * Means to start icons counting order
	 */
	countFromEnd: boolean;
	/**
	 * Means to show icons vertically
	 */
	iconsVertical: boolean;
	/**
	 * It is constructor, which take values from Rating Component and create Rating Model object.
	 */
	constructor(values: Object = {}) {
		super(values);
		Object.assign(this, values);

		if(this.icon==null) this.icon = "star";
		if(this.value==null) this.value = 0;
		if(this.max==null) this.max = 5;
		if(this.countFromEnd==null) this.countFromEnd = false;
		if(this.iconsVertical==null) this.iconsVertical = false;
		if(this.disable==null) this.disable = false;
	}
}