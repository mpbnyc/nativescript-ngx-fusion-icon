import { StylingModel } from '../style/styling.model';
import { CoreStylingModel } from '../core/core-styling.model';

export class SelectableStylingModel extends CoreStylingModel {
    
    /**@hidden */
    selectable: StylingModel;

    /**@hidden */
	constructor(values: Object = {}) {
        super(values);
		Object.assign(this, values);

        if(this.selectable==null)
            this.selectable = new StylingModel();
	}
}