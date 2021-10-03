import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-other-page',
  templateUrl: './other-page.page.html',
  styleUrls: ['./other-page.page.scss'],
})
export class OtherPagePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

	goToHome() {
		this.router.navigateByUrl("/home")
	}

}
