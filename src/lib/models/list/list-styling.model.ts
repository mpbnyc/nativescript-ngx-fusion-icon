import { StylingModel } from '../style/styling.model';
import { CoreStylingModel } from '../core/core-styling.model';

export class ListStylingModel extends CoreStylingModel {

	title: StylingModel;

	constructor(values: Object = {}) {
        super(values);
		Object.assign(this, values);

		if(this.title==null)
			this.title = new StylingModel();
	}
}