import { HttpClient,HttpParams } from '@angular/common/http';

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


  public findAll(page:number,itemsPerPage:number): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.apiUrl);
  }

  public save(createdTicket: createdTicket):Observable<any> {
  
    return this.http.post<any>(this.apiUrl, createdTicket);
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

  public getTicketsByUser(page:number,itemsPerPage:number): Observable<Ticket[]> {

    let params = new HttpParams();
    params = params.append('pageNo', page);
    params = params.append('pageSize', itemsPerPage);

    return this.http.get<Ticket[]>(this.apiUrl + '/user/', {params});
  }

  public uploadFile(file: File, ticketId: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(this.apiUrl + '/attachement/'+ticketId, formData);
  }

}
