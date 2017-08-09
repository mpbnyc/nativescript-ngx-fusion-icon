import { CoreModel } from '../core/core.model';
import { IconModel } from '../icon/icon.model';

/**
 * <h4>Example of FabButton Model</h4>
 * <pre>{
 *		icon: null,
 *		label: 'I'm trigger button tooltip',
 *		labelPosition: 'above',
 *		display: true,
 *		disable: false,
 * }</pre>
 */
export class FabButtonModel extends CoreModel {

  /**
   * <p>Icon Fab trigger/action buttons based on IconModel</p>
   * <p>Default must be set in file: /src/assets/settings/fab/settings.ts</p>
   */
  icon?: IconModel;

  /**
   * <p>Text for Fab trigger/action buttons tooltips</p>
   */
  label?: string;

  /**
   * <p>Position of tooltip</p>
   * <p>Can be set in file: /src/assets/settings/fab/settings.ts <b>or</b>will take Angular Material default</p>
   */
  labelPosition?: string;

  /**@hidden
   * It is icon constructor, which take string values from Fab Component and create FabButton object.
   */
 constructor(values: Object = {}) {
   super(values);
		Object.assign(this, values);
	}
}