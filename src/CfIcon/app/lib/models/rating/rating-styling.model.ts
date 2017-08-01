import { StylingModel } from '../style/styling.model';
import { IconStylingModel } from '../icon/icon-styling.model';
import { CoreStylingModel } from '../core/core-styling.model';

export class RatingStylingModel extends CoreStylingModel {
	/**
	 * StylingModel options for component label
	 */
	label: StylingModel;
	/**
	 * StylingModel options for component items
	 */
	item: StylingModel;
	/**
	 * StylingModel options for component icon
	 */
	icon: IconStylingModel;
	/**
	 * Means size of component items
	 */
	iconSize: string;
	/**
	 * Css color name for selected icons
	 */
	filledColor: string;
	/**
	 * Css color name for not selected icons
	 */
	emptyColor: string;
	/**
	 * Constructor for generating styling options to rating component
	 */
	constructor(values: Object = {}) {
    super(values);
		Object.assign(this, values);

    if(this.iconSize==null) this.iconSize = '24px';
    if(this.filledColor==null) this.filledColor = 'gold';
    if(this.emptyColor==null) this.emptyColor = 'rgba(0,0,0,0.2)';
    if(this.label==null) this.label = new StylingModel();
    if(this.item==null) this.item = new StylingModel();
	}
}