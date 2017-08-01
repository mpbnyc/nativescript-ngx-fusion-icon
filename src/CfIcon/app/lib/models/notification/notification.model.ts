import { IconModel } from '../icon/icon.model';
/**
 * Notification model provide notification for some CF Components. It is expanding Core Component for that.
 * <h4>Example of Notification Model:</h4>
 * <pre>{
 *	value: this.notificationValue,
 *	type: 'text'
 * }</pre>
 */
export class NotificationModel {
	/**
	 * It is type of Notification value. Can be <b>text</b>(default) or <b>icon</b>. Optional.
	 */
	type?: string;
	/**
	 * It is notification value. Optional and default.
	 */
	value?: any;
	/**
	 * It is notification icon. Optional. Can be used when <b>type</b> is <b>icon</b>.
	 */
	icon?: IconModel;
	/**
	 * Constructor for taking input values and generating new Notification model.
	 */
	classes?: string;
	/**
	 * It is notification color classes. Can be <b>mat-primary</b>, <b>mat-accent</b>, <b>mat-warn</b> or other custom classes.
	 */
	position?: string;
	/**
	 * It is notification position. Default is <b>top-right</b> Can be also: <b>bottom-right</b>, <b>bottom-left</b>, <b>top-left</b>.
	 */
	constructor(values: Object = {}) {
		Object.assign(this, values);
	}
}