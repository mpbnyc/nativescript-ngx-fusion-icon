import { StylingModel } from '../style/styling.model';
import { CoreStylingModel } from '../core/core-styling.model';

export class ItemStylingModel extends CoreStylingModel {
    item: StylingModel;

    selectedItem: StylingModel;

	constructor(values: Object = {}) {
        super(values);
		Object.assign(this, values);
        
        if(this.item==null)
            this.item = new StylingModel();
        if(this.selectedItem==null)
            this.selectedItem = new StylingModel();
	}
}