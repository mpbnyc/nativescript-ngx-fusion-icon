import { SelectableModel } from '../models/selectable/selectable.model';
import { CheckboxStylingModel } from '../models/selectable/checkbox-styling.model';

export const CheckboxTemplates = {
    defaultTemplate: {
        property: new SelectableModel({
            display: true,
            disable: false,
            value: "checkbox",
            item: "Checkbox",
            checked: false,
            itemPosition: "after"
        }),
        style : new CheckboxStylingModel({
            container: {
                class: "cf-default-container"
            },
            checkbox: {
                themeColor: "primary"
            }
        })
    }
}