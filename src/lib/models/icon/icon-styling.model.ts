import { StylingModel } from '../style/styling.model';
import { CoreStylingModel } from '../core/core-styling.model';

export class IconStylingModel extends CoreStylingModel {
    
    icon: StylingModel;

    toggleIcon: {
        container:StylingModel;
        icon: StylingModel;
    }

    /**@hidden */
	constructor(values: Object = {}) {
        super(values);
		Object.assign(this, values);
        if(this.icon==null)
            this.icon = new StylingModel();
        if(this.toggleIcon==null)
            this.toggleIcon = {
                container: new StylingModel(),
                icon: new StylingModel()
            }
	}
}