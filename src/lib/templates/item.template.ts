import { ItemStylingModel } from '../models/item/item-styling.model';

export const ItemTemplates = {
    defaultTemplate: {
        property:{},
        style : new ItemStylingModel({
            container: {
                class: "",
                dynamicClass: ""
            },
            item: {
                class: "item",
                dynamicClass: ""
            },
            selectedItem: {
                class: "itemSelected",
                dynamicClass: ""
            },
        })
    }
}