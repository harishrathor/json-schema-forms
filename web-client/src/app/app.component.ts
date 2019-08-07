import { Component, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {

    public isClosed = true;
    public workListClosed = true;

    ngAfterViewInit() {
        const trigger = document.getElementById('hamburger');
        const overlay = document.getElementById('overlay');

        function hamburger_cross() {
            console.log('hamburger_cross');
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
        document.querySelector('[data-toggle="offcanvas"]').addEventListener('click', event => {
            document.getElementById('wrapper').classList.toggle('toggled');
            document.getElementById('wrapper').classList.toggle('menu-not-toggled');
        });
    }
}
/* 
$(document).ready(function () {
	var trigger = $('.hamburger'),
			overlay = $('.overlay'),
		 isClosed = false;

		trigger.click(function () {
			hamburger_cross();      
		});

		function hamburger_cross() {

			if (isClosed == true) {          
				overlay.hide();
				trigger.removeClass('is-open');
				trigger.addClass('is-closed');
				isClosed = false;
			} else {   
				overlay.show();
				trigger.removeClass('is-closed');
				trigger.addClass('is-open');
				isClosed = true;
			}
	}
	
	$('[data-toggle="offcanvas"]').click(function () {
				$('#wrapper').toggleClass('toggled');
	});  
});
*/