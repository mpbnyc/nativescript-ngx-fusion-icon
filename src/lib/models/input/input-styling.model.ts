import { StylingModel } from '../style/styling.model';
import { CoreStylingModel } from '../core/core-styling.model';
import { IconStylingModel } from '../icon/icon-styling.model';

export class InputStylingModel extends CoreStylingModel {
    
    iconStyling: IconStylingModel;


    input: StylingModel;

    hint:StylingModel;

    /**@hidden */
	constructor(values: Object = {}) {
        super(values);
		Object.assign(this, values);

        if(this.input==null)
            this.input= new StylingModel();

        if(this.hint==null)
            this.hint= new StylingModel();

        if(this.iconStyling==null)
            this.iconStyling = new IconStylingModel();
	}
}