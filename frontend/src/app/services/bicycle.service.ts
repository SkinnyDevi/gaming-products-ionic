import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bicycle } from '../models/bicycle';

const httpOptionsNative = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

const httpOptionsJSON = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BicycleService {

  endpoint: string = "http://localhost:8080/db_bicycles";

  constructor(private httpClient: HttpClient) { }

  getBicycles(): Observable<Bicycle[]>{
    return this.httpClient.get<Bicycle[]>(this.endpoint);
  }

	getBicycleById(id: number): Observable<Bicycle>{
		return this.httpClient.get<Bicycle>(this.endpoint + "/" + id);
	}

	addBicycle(bicycle: Bicycle): Observable<Bicycle> {
		const encodedBody = new URLSearchParams();
    encodedBody.append("model", bicycle.model);
    encodedBody.append("creation_year", bicycle.creation_year.toString());
    const body = encodedBody.toString();

    console.log("createBicycle")
    console.log(JSON.stringify(bicycle))
    return this.httpClient.post<Bicycle>(this.endpoint, body, httpOptionsNative);
	}

	addBicycleUsingJSON(bicycle: Bicycle): Observable<Bicycle> {
    return this.httpClient.post<Bicycle>(this.endpoint, JSON.stringify(bicycle), httpOptionsJSON);
  }

	deleteBicycle(id: number): Observable<Bicycle> {
		return this.httpClient.delete<Bicycle>(this.endpoint + "/" + id);
	}

  updateBicycle(bicycle: Bicycle, id: number): Observable<Bicycle> {
    const encodedBody = new URLSearchParams();
    encodedBody.append("model", bicycle.model);
    encodedBody.append("creation_year", bicycle.creation_year.toString());
    const body = encodedBody.toString();

    console.log("updateBicycle")
    console.log(JSON.stringify(bicycle))
    return this.httpClient.put<Bicycle>(this.endpoint + "/" + id, body, httpOptionsNative);
  }
}
