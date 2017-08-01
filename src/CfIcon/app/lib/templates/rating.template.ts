import { RatingModel } from '../models/rating/rating.model';
import { StylingModel } from '../models/style/styling.model';
import { RatingStylingModel } from '../models/rating/rating-styling.model';

export const RatingTemplates = {
    defaultTemplate: {
        property: new RatingModel({
            label: 'Rating label',
            icon: 'stars',
            value: 1,
            max: 5,
            countFromEnd: false,
            iconsVertical: false,
            disabled: false
        }),
        style : new RatingStylingModel({
            container: new StylingModel({
                class: 'cf-rating-container',
            }),
            label: new StylingModel({
                class: 'cf-rating-label'
            }),
            item: new StylingModel({
                class: 'cf-rating-item-icon',
                dynamicClass: "'dynamic-items-class'"
            }),
            iconSize: '30px',
            filledColor: 'lightseagreen',
            emptyColor: 'darkseagreen',
        })
    }
}