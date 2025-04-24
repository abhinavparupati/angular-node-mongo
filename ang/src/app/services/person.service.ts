import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiUrl = 'http://localhost:3000/person';

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Backend returned code ${error.status}, body was: ${error.error?.message || error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }

  getPerson(id: string): Observable<Person> {
    return this.http.get<Person>(`${this.apiUrl}/${id}`).pipe(
      tap(data => console.log('Fetched person:', data)),
      catchError(this.handleError)
    );
  }

  getAllPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(this.apiUrl).pipe(
      tap(data => console.log('Fetched all people:', data)),
      catchError(this.handleError)
    );
  }

  createPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.apiUrl, person).pipe(
      catchError(this.handleError)
    );
  }

  updatePerson(id: string, person: Person): Observable<Person> {
    return this.http.put<Person>(`${this.apiUrl}/${id}`, person).pipe(
      catchError(this.handleError)
    );
  }

  deletePerson(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
} 