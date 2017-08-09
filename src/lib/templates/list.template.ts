import { ListModel } from '../models/list/list.model';
import { ListStylingModel } from '../models/list/list-styling.model';

export const ListTemplates = {
    defaultTemplate: {
        property: new ListModel({
            title:"My List"
        }),
        style : new ListStylingModel({
            container: {
                class: "",
                dynamicClass: ""
            },
            title:{
                class: "",
                dynamicClass: ""
            }
        })
    }
}