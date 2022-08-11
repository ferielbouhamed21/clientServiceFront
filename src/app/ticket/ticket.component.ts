import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { customResponse } from '../interface/custom-response';
import { Ticket } from '../models/ticket';
import { User } from '../models/user';
import { TicketService } from '../service/tickets.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  tickets: Ticket[] ;
  //  @Input() isLogged: boolean ;
  //  @Input() isAdmin: boolean ;

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
    
    this.ticketService.findAll().subscribe(data => {
      this.tickets = data;
    });
  }
  
}
