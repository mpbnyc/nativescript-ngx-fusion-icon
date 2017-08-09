import { CoreModel } from '../core/core.model';
import { FabButtonModel } from './fab-button.model';
/**
 * <h4>Example of Fab Model:</h4>
 * <pre>{
 *	direction: 'right';
 *	triggerButton: Object<FabButtonModel> ;
 *	actionButtons: <FabButtonModel>[];
 *	showButtons: true;
 *	stayOpened: true;
 * }</pre>
 */
export class FabModel extends CoreModel {

  /**
   * <p>Direction of opening Fab action buttons</p>
   * <p>Default must be set in file: ../templates/fab.template.ts.ts</p>
   * <p>Options: 'up', 'right', 'down', 'left'</p>
   */
  direction?: string;

  /**
   * <p>Fab trigger button based on FabButtonModel</p> 
   * <p>Default must be set in file: ../templates/fab.template.ts.ts</p>
   */
  triggerButton?: FabButtonModel;

  /**
   * <p>Array of buttons with type FabButtonModel</p>
   */
  actionButtons?: FabButtonModel[];

  /**
   * <p>Show fab action buttons on init</p>
   * <p>Default is false</p>
   */
  showButtons?: boolean;

  /**
   * <p>Hide or SHow action buttons</p>
   * <p>Default is false</p>
   */
  stayOpened?: boolean;

  /**@hidden
   * It is icon constructor, which take string values from Fab Component and create Fab object.
   */
  constructor(values: Object = {}) {
    super(values);
		Object.assign(this, values);
	}
}