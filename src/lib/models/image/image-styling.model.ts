import { StylingModel } from '../style/styling.model';
import { CoreStylingModel } from '../core/core-styling.model';

export class ImageStylingModel extends CoreStylingModel {
    
    label: StylingModel;

    image: StylingModel;

    /** @hidden */
	constructor(values: Object = {}) {
        super(values);
		Object.assign(this, values);

        if(this.label==null)
            this.label= new StylingModel();
        if(this.image==null)
            this.image= new StylingModel();
	}
}