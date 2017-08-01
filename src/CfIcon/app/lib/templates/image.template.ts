import { ImageModel } from '../models/image/image.model';
import { ImageStylingModel } from '../models/image/image-styling.model';

export const ImageTemplates = {
    defaultTemplate: {
        property: new ImageModel({
            // label: 'Figure 1: Default Caption',
            label: '',
            labelPosition: 'bottom',
            url: 'https://s-media-cache-ak0.pinimg.com/736x/d7/73/86/d7738697514f2d53efa84278ae2af614--felt-tip-pen-art-bullet-journal-mountains.jpg',
        }),
        style : new ImageStylingModel({
            container: {
                class: "cf-defaultImageContainer",
            },
            image: {
                class: "cf-defaultImage",
            },
            label: {
                class: "cf-defaultImageLabel"
            }
        })
    }
}