import { IconModel } from '../models/icon/icon.model';
import { IconStylingModel } from '../models/icon/icon-styling.model';

export const IconTemplates = {
    defaultTemplate: {
        property: new IconModel({
            display: true,
            name: "cloud",
            size: 50,
            value: "icon"
        }),
        style : new IconStylingModel({
            container: {
                class: ""
            },
            icon: {
                class: "cf-default-icon",
                themeColor:"crimson"
            }
        })
    },
    closeTemplate: {
        property: new IconModel({
            display: true,
            name: "fa-times-circle",
            size: 18,
            value: "close"
        }),
        style : new IconStylingModel({
            icon: {
                class: "cf-close-icon"
            }
        })
    }
}