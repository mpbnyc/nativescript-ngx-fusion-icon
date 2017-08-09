import { IconModel } from '../models/icon/icon.model';
import { IconStylingModel } from '../models/icon/icon-styling.model';
import { InputModel } from '../models/input/input.model';
import { InputStylingModel } from '../models/input/input-styling.model';

export const InputTemplates = {
    defaultTemplate: {
        property: new InputModel({
            type : "text",		
            placeholder: "Input value",
            maxlength : "10",
            hint : {
                text : "max 10",
                align : "end"
            },
            iconProperty: new IconModel ({		
                display: true,
                name: "thumb_up",
                size: "24px",
                value: "icon"
            }),
            iconPosition:"right"
        }),
        style : new InputStylingModel({
            container: {
                class: "",
                dynamicClass: ""
            },
            input:{
                class:"",
                dynamicClass: "",
                themeColor:"primary"
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