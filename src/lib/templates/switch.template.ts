import { SelectableModel } from '../models/selectable/selectable.model';
import { SwitchStylingModel } from '../models/selectable/switch-styling.model';

export const SwitchTemplates = {
    defaultTemplate: {
        property: new SelectableModel({
            display: true,
            disable: false,
            value: "slide",
            item: 'Switch Button',
            checked: true,
            itemPosition: "after"
        }),
        style : new SwitchStylingModel({
            container: {
                class: "cf-default-container",
                dynamicClass: ""
            },
            switch: {
                class: "",
                dynamicClass: "",
                themeColor: "#f2f2f2"
            }
        })
    }
}