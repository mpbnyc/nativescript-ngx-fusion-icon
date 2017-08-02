import { Injectable, OnInit } from '@angular/core';

import { DraggableService } from '../draggable-service/draggable.service';

const COMP_PREFIX = 'cf_comp_';
const PAGE_PREFIX = 'cf_page_';

/**
 * <p>Components storage service.</p>
 */
@Injectable()
export class PageStorageService implements OnInit {

    constructor() {}

    ngOnInit(): void {}

    storeComponent(compId: string, compName: string, compData: any, pageId: string): void {
        // remove DynamicComponentLoader specific data, no need to store them
        var compDataCopy = Object.assign({}, compData);
        delete compDataCopy.component;
        delete compDataCopy.loadedInstance;

        // prepare object to store
        let pageDef = JSON.parse( localStorage.getItem(PAGE_PREFIX + pageId) ) || {};
        pageDef.components = pageDef.components || {};

        let compDef = pageDef.components[compId] || {};
        compDef.id = compId;
        compDef.name = compName;
        compDef.data = compDataCopy;
        pageDef.components[compId] = compDef;

        localStorage.setItem(PAGE_PREFIX + pageId, JSON.stringify(pageDef));
    }

    storeComponentOptions(compId: string, compOptions: any): void {
        let pageId = this.getPageId();

        let pageDef = JSON.parse( localStorage.getItem(PAGE_PREFIX + pageId) ) || {};
        pageDef.components = pageDef.components || {};

        let compDef = pageDef.components[compId] || {};
        compDef.id = compId;
        compDef.options = compOptions;
        pageDef.components[compId] = compDef;

        localStorage.setItem(PAGE_PREFIX + pageId, JSON.stringify(pageDef));
    }

    getPageComponentsDefinitions(pageId: string): any[] {
        let pageDef = JSON.parse( localStorage.getItem(PAGE_PREFIX + pageId) ) || {};
        let components = pageDef.components || {};

        let pageCompsDefs = [];
        Object.keys(components).forEach((compId) => {
            pageCompsDefs.push( components[compId] );
        });
        return pageCompsDefs;
    }

    removeComponent(compId: string, pageId: string): void {
        let pageDef = JSON.parse( localStorage.getItem(PAGE_PREFIX + pageId) ) || {};

        if (pageDef.components) {
            delete pageDef.components[compId];
        }

        localStorage.setItem(PAGE_PREFIX + pageId, JSON.stringify(pageDef));
    }

    getPageId(): string {
        return document.getElementsByTagName('body')[0].getAttribute('pageId');
    }
}