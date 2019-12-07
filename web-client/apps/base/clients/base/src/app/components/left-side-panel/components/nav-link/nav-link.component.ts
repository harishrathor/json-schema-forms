import { NavLink } from '@interfaces/menu.interfaces';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-nav-link',
  templateUrl: './nav-link.component.html',
  styleUrls: ['./nav-link.component.scss']
})
export class NavLinkComponent implements OnInit {

    @Input()
    public navConfig: NavLink;
    public linkClasses: object;
    public dropdownClosed: boolean;

    constructor() { }

    ngOnInit() {
        this.dropdownClosed = true;
        this.linkClasses = {
            'active-navlink'        : this.navConfig.active,
            'disabled-navlink'      : this.navConfig.disabled,
            'is-root'               : this.navConfig.root,
            'is-parent'             : this.navConfig.parent,
            'is-external-navlink'   : this.navConfig.isExternalLink,
            'navigation-link'              : true
        };
    }
}
