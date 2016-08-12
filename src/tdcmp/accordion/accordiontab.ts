import { Component, Input, ContentChild} from '@angular/core';
import { TDaccordion } from './accordion';
import { TDHeader } from './accordion.header';

@Component({
    selector: 'td-accordionTab',
    template: `
        <div class="ui-accordion-header ui-helper-reset ui-state-default" [ngClass]="{'ui-state-active': selected,'ui-state-hover':hover&&!disabled,'ui-state-disabled':disabled}"
            (click)="toggle($event)" (mouseenter)="hover = true" (mouseleave)="hover=false">
            <span class="fa fa-fw" [ngClass]="{'fa-caret-down': selected, 'fa-caret-right': !selected}"></span>
            <a href="#" *ngIf="!headerFacet">{{header}}</a>
            <a href="#" *ngIf="headerFacet">
                <ng-content select="header"></ng-content>
            </a>
        </div>
        <div class="ui-accordion-content ui-helper-reset ui-widget-content" [style.display]="selected ? 'block' : 'none'">
            <ng-content></ng-content>
        </div>
    `
})
export class TDaccordionTab {

    @Input() header: string;

    @Input() selected: boolean;

    @Input() disabled: boolean;

    @ContentChild(TDHeader) headerFacet;

    constructor(protected accordion: TDaccordion) {
        this.accordion.addTab(this);
    }

    toggle(event) {
        if (this.disabled) {
            event.preventDefault();
            return;
        }

        let index = this.findTabIndex();

        if (this.selected) {
            this.selected = !this.selected;
            this.accordion.onClose.emit({originalEvent: event, index: index});
        } else {
            if (!this.accordion.multiple) {
                for (let i = 0; i < this.accordion.tabs.length; i++) {
                    this.accordion.tabs[i].selected = false;
                }
            }

            this.selected = true;

            this.accordion.onOpen.emit({originalEvent: event, index: index});
        }

        event.preventDefault();
    }

    findTabIndex() {
        let index = -1;
        for (let i = 0; i < this.accordion.tabs.length; i++) {
            if (this.accordion.tabs[i] === this) {
                index = i;
                break;
            }
        }
        return index;
    }
}

export const MD_ACCORDIONTAB_DIRECTIVES = [TDaccordionTab];
