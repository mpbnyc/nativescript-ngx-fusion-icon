import { FabModel } from '../models/fab/fab.model';

export const FabTemplates = {
    defaultTemplate: {
        property: new FabModel({    
            direction: "right", // can be: up, down, right, left    
            actionButtons: [
                { icon: {name: "home"}, display: true } ],
            triggerButton: {
                icon: {
                    name: "menu"
                }
            },
            labelPosition: "above" // can be: above, below, right, left
        }),
        style : {
            container: {
                class: "",
                dynamicClass: ""
            },
        }
    }
}