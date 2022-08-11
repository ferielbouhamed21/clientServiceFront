import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { customResponse } from '../interface/custom-response';
import { createdTicket } from '../models/createdTicket';
import { Ticket } from '../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private readonly apiUrl = 'http://localhost:8080/api/v1/tickets';

  constructor(private http: HttpClient) { }


  public findAll(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.apiUrl);
  }

  public save(createdTicket: createdTicket):Observable<Ticket> {
    console.log(createdTicket);
    return this.http.post<Ticket>(this.apiUrl, createdTicket);
  }

  public getTicket(ticketId: String): Observable<Ticket> {
    return this.http.get<Ticket>(this.apiUrl + '/' + ticketId);
  }
  
  public deletTicket(ticketId: String): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/' + ticketId);
  }

  public updateTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.put<Ticket>(this.apiUrl + '/' + ticket.id, ticket);
  }

  public getTicketsByUserId(userId: String): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.apiUrl + '/user/' + userId);
  }

  public uploadFile(file: File, ticketId: String): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(this.apiUrl + '/attachement/'+ticketId, formData);
  }

}
