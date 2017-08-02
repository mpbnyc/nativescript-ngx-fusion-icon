import { Injectable, ElementRef, OnInit, ReflectiveInjector } from '@angular/core';

import { PageStorageService } from '../page-storage-service/page-storage-service';

/**
 * <p>Service to drag and drop components.</p>
 */
@Injectable()
export class DraggableService implements OnInit {
    nativeElement: any;

    private topStart: number;
    private leftStart: number;
    private draggable: boolean = true;
    private moving: boolean;

    injector = ReflectiveInjector.resolveAndCreate([PageStorageService]);
    pageStorageService: PageStorageService;

    constructor() {
        this.pageStorageService = this.injector.get(PageStorageService);
    }

    ngOnInit() {}

    makeDraggable(compId: string, nativeElement: any, value: boolean) {
        this.nativeElement = nativeElement;

        // css changes
        if (this.draggable) {
            this.nativeElement.style.position = 'absolute';
        }

        this.draggable = value;

        if (this.draggable) {
            // events
            this.nativeElement.addEventListener('mousedown', (event) => {
                this.moving = true;
                this.topStart = event.clientY - this.nativeElement.style.top.replace('px','');
                this.leftStart = event.clientX - this.nativeElement.style.left.replace('px','');
            });

            this.nativeElement.addEventListener('mouseup', (event) => {
                this.moving = false;

                this.pageStorageService.storeComponentOptions(compId, {
                    tagName: this.nativeElement.tagName,
                    left: this.nativeElement.offsetLeft,
                    top: this.nativeElement.offsetTop
                });
            });

            this.nativeElement.addEventListener('mousemove', (event) => {
                if (this.moving && this.draggable) {
                    this.nativeElement.style.position = 'absolute';
                    this.nativeElement.style.top = (event.clientY - this.topStart) + 'px';
                    this.nativeElement.style.left = (event.clientX - this.leftStart) + 'px';
                }
            });

            this.nativeElement.addEventListener('mouseleave', (event) => {
                this.moving = false;
            });
        }
    }
}