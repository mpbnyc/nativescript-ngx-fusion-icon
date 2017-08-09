import { SelectModel } from '../models/select/select.model';
import { SelectStylingModel } from '../models/select/select-styling.model';

export const SelectTemplates = {
    defaultTemplate: {
        property: new SelectModel({
		    placeholder: "Select: ",
            display: true,
            disable: false,
        }),
        style : new SelectStylingModel({
            container: {
                class: "",
                dynamicClass: ""
            },
        })
    }
}