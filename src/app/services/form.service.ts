import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Country } from '../../common/country';
import { State } from '../../common/state';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { }

  private countriesUrl = "http://localhost:8080/api/countries";
  private statesUrl = "http://localhost:8080/api/states";

  getCountries(): Observable<Country []> {
    return this.http.get<GetResponseCountry>(this.countriesUrl).pipe(map(response=> response._embedded.countries));
  }

  getStates(countryCode: string): Observable<State []> {
    const searchUrl = `${this.statesUrl}/search/findByCountryCode?code=${countryCode}`;
    return this.http.get<GetResponseState>(searchUrl).pipe(map(response=> response._embedded.states));
  }


  getCreditCardMonths(startMonth: number): Observable<number[]> {
      let data: number [] = [];

      // we provide choices from current month to end of year.
      for(let month= startMonth;month<=12;month++){
        data.push(month);
      }

      return of(data);
  }

  getCreditCardYears(): Observable<number []>{
    let data: number[] = [];

    // choice upto 10 years

    const startYear: number = new Date().getFullYear();

    for(let year = startYear;year<=startYear+9;year++){
      data.push(year);
    }
    return of(data);
  }
}


interface GetResponseCountry {
  _embedded: {
    countries: Country [];
  }
}

interface GetResponseState {
  _embedded: {
    states: State [];
  }
}
