import { StylingModel } from '../style/styling.model';
import { CoreStylingModel } from '../core/core-styling.model';

export class SwitchStylingModel extends CoreStylingModel {
    
    switch: StylingModel;

     /**@hidden */
	constructor(values: Object = {}) {
        super(values);
		Object.assign(this, values);

        if(this.switch==null)
            this.switch = new StylingModel();
	}
}