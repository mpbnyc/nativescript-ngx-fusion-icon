import { StylingModel } from '../style/styling.model';
import { CoreStylingModel } from '../core/core-styling.model';

export class SelectStylingModel extends CoreStylingModel {

	select: StylingModel;

	filter: StylingModel;

	options: StylingModel;

	/**@hidden */
	constructor(values: Object = {}) {
        super(values);
		Object.assign(this, values);

		if(this.select==null)
			this.select = new StylingModel();
		if(this.filter==null)
			this.filter = new StylingModel();
		if(this.options==null)
			this.options = new StylingModel();
	}
}