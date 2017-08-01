import { StylingModel } from '../style/styling.model';

export class CoreStylingModel {    
    container:StylingModel;

	constructor(values: Object = {}) {
		Object.assign(this, values);
        if(this.container==null)
            this.container = new StylingModel();
	}
}