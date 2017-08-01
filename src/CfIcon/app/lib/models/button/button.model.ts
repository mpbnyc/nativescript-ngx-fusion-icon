import { CoreModel } from '../core/core.model';
import { IconModel } from '../icon/icon.model';

/**
 * <h4>Example of Button Model:</h4>
 * <pre>{
 *	label: 'Buy',
 *	iconProperty: {
 *		name: 'fa-money'
 *  }
 *  iconPosition: 'right'	
 * }</pre>
 */

export class ButtonModel extends CoreModel {
	
	/**
	 * <p>Label on the button</p>
	 * <p>Default is <b>BTN</b></p>
	 */
	label?: string='BTN';

	/**
	 * <p> Icon object on the button</p>
	 * <p> Refer to Icon Component</p>
	 */
	iconProperty?: IconModel;

	/**
	 * <p>Position of the icon (Left of Right)</p>
	 * <p>Default is <b>'left'</b></p>
	 */
	iconPosition?: string="left";
	
	/**
	 * <p>Waiting state of the button
	 * <p>Button can be in that state  whether enabled or disabled</p>
	 */
	waiting?: { 
		/**
		 * <p>Property to toggle button in/out of 'waiting' state</p>
		 */
		value: boolean;
		/**
		 * <p>Disable button when it is in 'waiting' state</p>
		 */
		disabled: boolean;
		/**
		 * <p>Icon representing button in 'waiting' state</p>
		 */
		iconProperty: IconModel;
	};

	/**@hidden
	 * It is the constructor for the button component. It takes the required string values to create the button object
	 */
	constructor(values: Object = {}) {
		super(values);
		Object.assign(this, values);
		if(this.iconProperty!=null) this.iconProperty = new IconModel(this.iconProperty);
		if(this.iconPosition==null)
			this.iconPosition = "left";
	}
}