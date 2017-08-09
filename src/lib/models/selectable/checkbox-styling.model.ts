import { StylingModel } from '../style/styling.model';
import { CoreStylingModel } from '../core/core-styling.model';

export class CheckboxStylingModel extends CoreStylingModel {
    
    checkbox: StylingModel;

     /**@hidden */
	constructor(values: Object = {}) {
        super(values);
		Object.assign(this, values);

        if(this.checkbox==null)
            this.checkbox = new StylingModel();
	}
}