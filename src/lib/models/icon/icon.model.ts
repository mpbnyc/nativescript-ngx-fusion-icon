import { CoreModel } from '../core/core.model';
/**
 * <h4>Example of Icon Model:</h4>
 * <pre>{
 *	name: 'fa-heart-o',
 *	size: '18px',
 *	value: 'empty heart',
 *	toggle: {
 *		name: 'fa-heart',
 *		size: '18px',
 *		value: 'full heart'
 *	}	
 *}
 * </pre>
 */

export class IconModel extends CoreModel {
	/**
	 * <p></p>
	 * <p>Name of the icon</p>
	 * <p>Default is <b>home</b></p>
	 * <p>Icon libraries available: Material Icons and Font Awesome Icons</p>
	 * <p><i>If icon name consists of more then one word, then:</i></p>
	 * <p><i>- for Material Icons: join words with underscore (like: <b>thumb_up</b>)</i></p>
	 * <p><i>- for Font Awesome Icons: join words with dash (like: <b>fa-address-book</b>)</i></p>
	 */
	name?: string = 'home';

	/**@hidden
	 * <p>It is type of icon. Optional, but must be set with icon name together.</p> 
	 * <p>Types are: <b>mi</b> (Material Icons) and <b>fa</b> (Font Awesome Icons). Default is <b>mi</b> type.</p>
	 */
	type?: string = 'mi';

	/**
	 * <p>Icon size</p>
	 * <p>Can be in pixels, em, percetages </p>
	 * <p>Default is <b>'24px'</b></p>
	 */
	size?: number = 24;

  /**
   * <p> Value emitted on click</p>
   */
	value?: any;

	toggle?: {	
 		/**
	 	 * <p>Name of the icon</p>
	 	 * <p>Default is <b>home</b></p>
	 	 * <p>Icon libraries available: Material Icons and Font Awesome Icons</p>
	 	 * <p><i>If icon name consists of more then one word, then:</i></p>
	 	 * <p><i>- for Material Icons: join words with underscore (like: <b>thumb_up</b>)</i></p>
	 	 * <p><i>- for Font Awesome Icons: join words with dash (like: <b>fa-address-book</b>)</i></p>
	 	 */
		name?: string;
        
		/**@hidden
         * <p>It is type of icon. Optional, but must be set with icon name together.</p> 
         * <p>Types are: <b>mi</b> (Material Icons) and <b>fa</b> (Font Awesome Icons). Default is <b>mi</b> type.</p>
         */
		// type?: string;

		/**
	 	 * <p>Icon size</p>
	 	 * <p>Can be in pixels, em, percetages</p>
	 	 * <p>Default is <b>'24px'</b></p>
	 	 */
		size?: number;

    /**
     * <p> Value emitted on toggle</p>
     */
		value?: any;
	}

	/**@hidden
	 * It is icon constructor, which take string values from Icon Component and create Icon object.
	 */
	
	constructor(values: Object = {}) {
		super(values);
		Object.assign(this, values);
		// if(this.size!=null)
		// 	if(!this.size.endsWith("px") && !this.size.endsWith("%"))
		// 		this.size = this.size + "%";
		
		// if(this.name.startsWith("fa-"))
		// 	this.type = "fa";
		// else
		// 	this.type = "mi";
		
		// if(this.toggle!=null)
		// {
		// 	if(this.toggle.name.startsWith("fa-"))
		// 		this.toggle.type = "fa";
		// 	else
		// 		this.toggle.type = "mi";
		// }
	}
}