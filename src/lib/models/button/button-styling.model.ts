import { StylingModel } from '../style/styling.model';
import { CoreStylingModel } from '../core/core-styling.model';
import { IconStylingModel } from '../icon/icon-styling.model';

export class ButtonStylingModel extends CoreStylingModel {
    
    iconStyling: IconStylingModel;

    waitingIconStyling: IconStylingModel;

    button:StylingModel;

    /** @hidden*/
	constructor(values: Object = {}) {
        super(values);
		Object.assign(this, values);

        if(this.button==null)
        {
            this.button= new StylingModel();
            this.button.themeColor="white";
        }

        if(this.iconStyling==null)
            this.iconStyling = new IconStylingModel();
        if(this.waitingIconStyling==null)
            this.waitingIconStyling = new IconStylingModel();
	}
}