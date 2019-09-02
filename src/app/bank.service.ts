import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Bank } from './bank';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  private bankUrl = 'https://vast-shore-74260.herokuapp.com/banks?city=';

  constructor(private http: HttpClient) { }

  getBanks(branchName: string): Observable<Bank[]>  {
    return this.http.get<Bank[]>(this.bankUrl + branchName).
    pipe(tap(data => console.log(JSON.stringify(data))));
  }

}
