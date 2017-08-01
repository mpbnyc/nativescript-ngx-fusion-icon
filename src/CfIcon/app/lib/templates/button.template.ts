import { IconModel } from '../models/icon/icon.model';
import { IconStylingModel } from '../models/icon/icon-styling.model';
import { ButtonModel } from '../models/button/button.model';
import { ButtonStylingModel } from '../models/button/button-styling.model';
import { IconTemplates } from './icon.template';

export const ButtonTemplates = {
    defaultTemplate: {
        property: new ButtonModel({
            display: true,
            disable: false,
            label: "CF BUTTON",
            icon: {
                name: "star",
                size: 24,
                position: "left"
            }
        }),
        style : new ButtonStylingModel({
            container: {
                class: "default-container"
            },
            button: {
                themeColor: "white"
            },
            iconStyling: new IconStylingModel ({
                icon: {
                    class: "",
                    dynamicClass: ""
                }
            })
        })
    },

    submitTemplate: {
        property: new ButtonModel({
            display: true,
            disable: false,
            label: "SUBMIT",
            iconProperty: null,
            iconPosition: "left"
        }),
        style : new ButtonStylingModel({
            container: {
                class: "",
                dynamicClass: ""
            },
            button: {
                class: "cf-submit-button",
                dynamicClass: "",
                themeColor: ""
            },
            iconStyling: new IconStylingModel ({
                icon: {
                    class: "",
                    dynamicClass: ""
                }
            })
        })
    }
}