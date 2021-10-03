import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bicycle } from "../models/bicycle";
import { BicycleService } from "../services/bicycle.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public bikeID: number = 2;

	public bicycles: Array<Bicycle> = [];
	public bike: Bicycle = new Bicycle();
  public uBike: Bicycle = new Bicycle();

  constructor(private router: Router, private bicycleService: BicycleService) {}

	ngOnInit(): void {
		this.loadInfo()
	}

	loadInfo() {
		this.bicycleService.getBicycles().subscribe((b: Array<Bicycle>) => {
			this.bicycles = b;
		})

		this.bicycleService.getBicycleById(this.bikeID).subscribe((b: Bicycle) => {
			this.bike = b;
		})
	}

	goToOtherPage() {
		this.router.navigateByUrl("/other-page");
	}

	addBicycle(){
    console.log("addBicycle")
    const b: Bicycle = { id: 0, model: "Bianci", creation_year: 2020 };
    this.bicycleService.addBicycle(b).subscribe(() => {
			this.loadInfo()
		});
  }

	addBicycleJSON(){
    console.log("addBicycleJSON")
    const b: Bicycle = { id: 0, model: "Canondale", creation_year: 2015 };
    this.bicycleService.addBicycleUsingJSON(b).subscribe(() => {
			this.loadInfo()
		});
  }

	deleteBicycle(idBicycle: number){
		console.log("deleteBicycle")
		this.bicycleService.deleteBicycle(idBicycle).subscribe(() => {
			this.loadInfo()
		});
	}

  updateBicycle(idBicycle: number){
    this.bicycleService.getBicycleById(this.bikeID).subscribe((b: Bicycle) => {
			this.uBike = b;
      console.log(this.uBike)
      this.uBike.creation_year = 9999;
      console.log(this.uBike)

      this.bicycleService.updateBicycle(this.uBike, idBicycle).subscribe(() => {
        this.loadInfo();
      });
		});
	}
}
