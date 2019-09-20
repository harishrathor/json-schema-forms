import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-left-side-panel',
  templateUrl: './left-side-panel.component.html',
  styleUrls: ['./left-side-panel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LeftSidePanelComponent implements AfterViewInit {

  public isClosed = true;
  public workListClosed = true;
  /* 
  name: string;
label: string;
    icon: string;
    disabled: boolean;
    active: boolean;
    parent: boolean;
    root: boolean;
    description: boolean;
    linkURL: boolean;
    isExternalLink: boolean;
    children?: NavLink[] | null;
*/
  public menuData = {
      navigations: [
            {
                label           : 'Home',
                name            : 'home',
                icon            : 'fa fa-home',
                disabled        : false,
                active          : true,
                parent          : true,
                root            : true,
                description     : '',
                linkURL         : '/home',
                isExternalLink  : false,
                children        : [
                    {
                        label           : 'Home',
                        name            : 'home',
                        icon            : 'fa fa-home',
                        disabled        : false,
                        active          : true,
                        parent          : false,
                        root            : true,
                        description     : '',
                        linkURL         : '/home',
                        isExternalLink  : false,
                        children        : null
                    },
                    {
                        label           : 'Abdscdef',
                        name            : 'abcdf',
                        icon            : 'fa fa-file',
                        disabled        : false,
                        active          : true,
                        parent          : false,
                        root            : true,
                        description     : '',
                        linkURL         : '/abcdef',
                        isExternalLink  : false,
                        children        : null
                    },
                    {
                        label           : 'Jklmnopkrst',
                        name            : 'jlpk',
                        icon            : 'fa fa-save',
                        disabled        : false,
                        active          : true,
                        parent          : false,
                        root            : true,
                        description     : '',
                        linkURL         : '/save',
                        isExternalLink  : false,
                        children        : null
                    },
                    {
                        label           : 'Mnopqrq',
                        name            : 'edrg',
                        icon            : 'fa fa-download',
                        disabled        : false,
                        active          : true,
                        parent          : true,
                        root            : true,
                        description     : '',
                        linkURL         : '/download',
                        isExternalLink  : false,
                        children        : [
                            {
                                label           : 'Home',
                                name            : 'home',
                                icon            : 'fa fa-home',
                                disabled        : false,
                                active          : true,
                                parent          : false,
                                root            : true,
                                description     : '',
                                linkURL         : '/home',
                                isExternalLink  : false,
                                children        : null
                            },
                            {
                                label           : 'Abdscdef',
                                name            : 'abcdf',
                                icon            : 'fa fa-file',
                                disabled        : false,
                                active          : true,
                                parent          : false,
                                root            : true,
                                description     : '',
                                linkURL         : '/abcdef',
                                isExternalLink  : false,
                                children        : null
                            },
                            {
                                label           : 'Jklmnopkrst',
                                name            : 'jlpk',
                                icon            : 'fa fa-save',
                                disabled        : false,
                                active          : true,
                                parent          : false,
                                root            : true,
                                description     : '',
                                linkURL         : '/save',
                                isExternalLink  : false,
                                children        : null
                            },
                            {
                                label           : 'Mnopqrq',
                                name            : 'edrg',
                                icon            : 'fa fa-download',
                                disabled        : false,
                                active          : true,
                                parent          : true,
                                root            : true,
                                description     : '',
                                linkURL         : '/download',
                                isExternalLink  : false,
                                children        : [
                                    {
                                        label           : 'Home',
                                        name            : 'home',
                                        icon            : 'fa fa-home',
                                        disabled        : false,
                                        active          : true,
                                        parent          : false,
                                        root            : true,
                                        description     : '',
                                        linkURL         : '/home',
                                        isExternalLink  : false,
                                        children        : null
                                    },
                                    {
                                        label           : 'Abdscdef',
                                        name            : 'abcdf',
                                        icon            : 'fa fa-file',
                                        disabled        : false,
                                        active          : true,
                                        parent          : false,
                                        root            : true,
                                        description     : '',
                                        linkURL         : '/abcdef',
                                        isExternalLink  : false,
                                        children        : null
                                    },
                                    {
                                        label           : 'Jklmnopkrst',
                                        name            : 'jlpk',
                                        icon            : 'fa fa-save',
                                        disabled        : false,
                                        active          : true,
                                        parent          : false,
                                        root            : true,
                                        description     : '',
                                        linkURL         : '/save',
                                        isExternalLink  : false,
                                        children        : null
                                    },
                                    {
                                        label           : 'Mnopqrq',
                                        name            : 'edrg',
                                        icon            : 'fa fa-download',
                                        disabled        : false,
                                        active          : true,
                                        parent          : true,
                                        root            : true,
                                        description     : '',
                                        linkURL         : '/download',
                                        isExternalLink  : false,
                                        children        : [
                                            {
                                                label           : 'Home',
                                                name            : 'home',
                                                icon            : 'fa fa-home',
                                                disabled        : false,
                                                active          : true,
                                                parent          : false,
                                                root            : true,
                                                description     : '',
                                                linkURL         : '/home',
                                                isExternalLink  : false,
                                                children        : null
                                            },
                                            {
                                                label           : 'Abdscdef',
                                                name            : 'abcdf',
                                                icon            : 'fa fa-file',
                                                disabled        : false,
                                                active          : true,
                                                parent          : false,
                                                root            : true,
                                                description     : '',
                                                linkURL         : '/abcdef',
                                                isExternalLink  : false,
                                                children        : null
                                            },
                                            {
                                                label           : 'Jklmnopkrst',
                                                name            : 'jlpk',
                                                icon            : 'fa fa-save',
                                                disabled        : false,
                                                active          : true,
                                                parent          : false,
                                                root            : true,
                                                description     : '',
                                                linkURL         : '/save',
                                                isExternalLink  : false,
                                                children        : null
                                            },
                                            {
                                                label           : 'Mnopqrq',
                                                name            : 'edrg',
                                                icon            : 'fa fa-download',
                                                disabled        : false,
                                                active          : true,
                                                parent          : false,
                                                root            : true,
                                                description     : '',
                                                linkURL         : '/download',
                                                isExternalLink  : false,
                                                children        : null
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                label           : 'Abdscdef',
                name            : 'abcdf',
                icon            : 'fa fa-file',
                disabled        : false,
                active          : true,
                parent          : false,
                root            : true,
                description     : '',
                linkURL         : '/abcdef',
                isExternalLink  : false,
                children        : null
            },
            {
                label           : 'Jklmnopkrst',
                name            : 'jlpk',
                icon            : 'fa fa-save',
                disabled        : false,
                active          : true,
                parent          : false,
                root            : true,
                description     : '',
                linkURL         : '/save',
                isExternalLink  : false,
                children        : null
            },
            {
                label           : 'Mnopqrq',
                name            : 'edrg',
                icon            : 'fa fa-download',
                disabled        : false,
                active          : true,
                parent          : true,
                root            : true,
                description     : '',
                linkURL         : '/download',
                isExternalLink  : false,
                children        : [
                    {
                        label           : 'Home',
                        name            : 'home',
                        icon            : 'fa fa-home',
                        disabled        : false,
                        active          : true,
                        parent          : false,
                        root            : true,
                        description     : '',
                        linkURL         : '/home',
                        isExternalLink  : false,
                        children        : null
                    },
                    {
                        label           : 'Abdscdef',
                        name            : 'abcdf',
                        icon            : 'fa fa-file',
                        disabled        : false,
                        active          : true,
                        parent          : false,
                        root            : true,
                        description     : '',
                        linkURL         : '/abcdef',
                        isExternalLink  : false,
                        children        : null
                    },
                    {
                        label           : 'Jklmnopkrst',
                        name            : 'jlpk',
                        icon            : 'fa fa-save',
                        disabled        : false,
                        active          : true,
                        parent          : false,
                        root            : true,
                        description     : '',
                        linkURL         : '/save',
                        isExternalLink  : false,
                        children        : null
                    },
                    {
                        label           : 'Mnopqrq',
                        name            : 'edrg',
                        icon            : 'fa fa-download',
                        disabled        : false,
                        active          : true,
                        parent          : true,
                        root            : true,
                        description     : '',
                        linkURL         : '/download',
                        isExternalLink  : false,
                        children        : [
                            {
                                label           : 'Home',
                                name            : 'home',
                                icon            : 'fa fa-home',
                                disabled        : false,
                                active          : true,
                                parent          : false,
                                root            : true,
                                description     : '',
                                linkURL         : '/home',
                                isExternalLink  : false,
                                children        : null
                            },
                            {
                                label           : 'Abdscdef',
                                name            : 'abcdf',
                                icon            : 'fa fa-file',
                                disabled        : false,
                                active          : true,
                                parent          : false,
                                root            : true,
                                description     : '',
                                linkURL         : '/abcdef',
                                isExternalLink  : false,
                                children        : null
                            },
                            {
                                label           : 'Jklmnopkrst',
                                name            : 'jlpk',
                                icon            : 'fa fa-save',
                                disabled        : false,
                                active          : true,
                                parent          : false,
                                root            : true,
                                description     : '',
                                linkURL         : '/save',
                                isExternalLink  : false,
                                children        : null
                            },
                            {
                                label           : 'Mnopqrq',
                                name            : 'edrg',
                                icon            : 'fa fa-download',
                                disabled        : false,
                                active          : true,
                                parent          : true,
                                root            : true,
                                description     : '',
                                linkURL         : '/download',
                                isExternalLink  : false,
                                children        : [
                                    {
                                        label           : 'Home',
                                        name            : 'home',
                                        icon            : 'fa fa-home',
                                        disabled        : false,
                                        active          : true,
                                        parent          : false,
                                        root            : true,
                                        description     : '',
                                        linkURL         : '/home',
                                        isExternalLink  : false,
                                        children        : null
                                    },
                                    {
                                        label           : 'Abdscdef',
                                        name            : 'abcdf',
                                        icon            : 'fa fa-file',
                                        disabled        : false,
                                        active          : true,
                                        parent          : false,
                                        root            : true,
                                        description     : '',
                                        linkURL         : '/abcdef',
                                        isExternalLink  : false,
                                        children        : null
                                    },
                                    {
                                        label           : 'Jklmnopkrst',
                                        name            : 'jlpk',
                                        icon            : 'fa fa-save',
                                        disabled        : false,
                                        active          : true,
                                        parent          : false,
                                        root            : true,
                                        description     : '',
                                        linkURL         : '/save',
                                        isExternalLink  : false,
                                        children        : null
                                    },
                                    {
                                        label           : 'Mnopqrq',
                                        name            : 'edrg',
                                        icon            : 'fa fa-download',
                                        disabled        : false,
                                        active          : true,
                                        parent          : false,
                                        root            : true,
                                        description     : '',
                                        linkURL         : '/download',
                                        isExternalLink  : false,
                                        children        : null
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
  };

  ngAfterViewInit() {
      const trigger = document.getElementById('hamburger');
      const overlay = document.getElementById('overlay');

      function hamburger_cross() {
          if (this.isClosed === true) {
              overlay.classList.add('hidden');
              trigger.classList.remove('is-open');
              trigger.classList.add('is-closed');
              this.isClosed = false;
          } else {
              overlay.classList.remove('hidden');
              trigger.classList.remove('is-closed');
              trigger.classList.add('is-open');
              this.isClosed = true;
          }
      }

      trigger.addEventListener('click', hamburger_cross);
      document.getElementById('wrapper').classList.toggle('menu-not-toggled');
      document.querySelector("[data-toggle='offcanvas']").addEventListener('click', event => {
          document.getElementById('wrapper').classList.toggle('toggled');
          document.getElementById('wrapper').classList.toggle('menu-not-toggled');
      });
  }
}


/* 
var webContentArr = [];
var colorCodes = [0,1,'a',3,2,'b',4,5,'c',7,'f',6,'d',8,9,'e'];
var length = 1000;
\var css ='';
for (var i = 0; i < length; i++) {
	var index1 = parseInt(Math.random() * 100) % colorCodes.length;
	var index2 = parseInt(Math.random() * 100) % colorCodes.length;
	var index3 = parseInt(Math.random() * 100) % colorCodes.length;
	var content = 'f' + colorCodes[index1] + colorCodes[index2] + colorCodes[index3];
	css += `
	.content-${content}::before {
    	content: '\${content}' !important;
  	}
`
	webContentArr.push(content)
; 

}
*/
