
import { CoreModel } from '../core/core.model';
import { IconModel } from '../icon/icon.model';

/**
 * <h4>Example of Input Model:</h4>
 * <pre>{
 *		type : "text",		
 *		placeholder: "Input value",
 *		prefix : "",
 *		maxlength : "10",
 *		dividerColor : "",
 *		value : "",
 *		suffix : "",
 *		hint : {
 *			text : "max 10",
 *			align : "end"
 *		},
 *		icon: {		
 *			name: "thumb_up",
 *			type: "mi",
 *			size: "20px",
 *			color: {
 *				foreground: "black",
 *				background: "transparent"
 *			}
 *		},
 *		iconPosition:"right",
 *		menu: null
 *	}</pre>
 */

export class InputModel extends CoreModel {

	/**
	 * <p>Type of the input</p>
	 * <p>Default "text"</p>
	 */
	type : string = "text";

	/**
	 * <p>Placeholder of the input</p>
	 */
	placeholder : string;

	/**
	 * <p>Hint of the input. align value - start or end</p>
	 */
	hint : {
		text : string,
		align : string
	};

	/**
	 * <p>Prefix of the input</p>
	 */
	prefix : string;

	/**
	 * <p>Suffix of the input</p>
	 */
	suffix : string;

	/**
	 * <p>Divider Color of the input</p>
	 */
	dividerColor : string;

	/**
	 * <p>Value of the input</p>
	 */
	value : string;

	/**
	 * <p>Input maxlength</p>
	 */
	maxlength : string;

	/**
     * <p>Icon object on the input.</p>
     */
	iconProperty : IconModel;

	/**
     * <p>Position of the icon</p>
	 * <p>Options:'left' or 'right'
	 * <p> Default: 'left'
     */
	iconPosition: string = "left";

	/**@hidden */
	constructor(values: Object = {}) {
		super(values);
		Object.assign(this, values);
		if(this.iconProperty!=null) this.iconProperty = new IconModel(this.iconProperty);
		if(this.hint == null || this.hint=={})
			this.hint = {	
				text: "",
				align: "end"
			};
	}
}