import { CoreModel } from '../core/core.model';

/**
 * <h4>Example of Image Model:</h4>
 * <pre>{
 *	label: 'Cedrus',
 *	labelPosition: 'bottom',
 *  url: 'https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAAuRAAAAJDM2YmM1ZTE0LTNiNzUtNDA0Zi1iMmU5LTA4N2Q0OGE5NDAxZQ.png'	
 * }</pre>
 */
export class ImageModel extends CoreModel {

	/** 
	 * <p>Label on image</p>
	 */
	label?: string = "";

	/** 
	 * <p>Label position</p>
	 * <p>Options: 'bottom', 'left', 'right', 'top'</p>
	 * <p>Default is <b>'bottom'</b></p>
	 */
  	labelPosition?: string = "bottom";

  	/** 
	 * <p>Image url with default image</p>
	 */
	url?: string="https://selectree.calpoly.edu/images/0200/92/original/cedrus-deodara-leaves.jpg";
	
	/** @hidden
	 * It is the constructor for the ImageModel component. It takes the values to create the ImageModel object.
	 */
	constructor(values: Object = {}) {
		super(values);
		Object.assign(this, values);
		if (this.labelPosition === '') this.labelPosition = 'bottom';
		if(this.url=='') this.url = "https://selectree.calpoly.edu/images/0200/92/original/cedrus-deodara-leaves.jpg";
	}
}