export class CoreModel {
    
    /**
     * <p> Display or hide the component.</p>
     * <p> Default <b>true</b></p>
     */
    display?: boolean = true;
    
    /**
     * <p>Disbale or Enable the component.</p>
     * <p> Default <b>false</b></p>
     */
    disable?: boolean = false;

    /**
     * <p>Tooltip on hover of the component</p>
     * <p>Structure:</p>
     * <pre>
     * {
     *  message: string, // Tip to be displayed
     *  position: string // Tooltip positon: 'top', 'right' ,'left', 'bottom'
     * }
     * </pre>
     */
    tooltip?: any;

    constructor(values: Object = {}) {
		Object.assign(this, values);
	}
}