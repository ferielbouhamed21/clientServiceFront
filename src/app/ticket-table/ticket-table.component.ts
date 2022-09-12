import { ChangeDetectorRef, Component, OnInit, ViewChild, Input } from '@angular/core';
import { Ticket } from '../models/ticket';
import { TicketService } from '../service/tickets.service';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-ticket-table',
  templateUrl: './ticket-table.component.html',
  styleUrls: ['./ticket-table.component.css']
})
export class TicketTableComponent implements OnInit {
  tickets: Ticket[] = [];
  displayedColumns = ['id', 'subject', 'status', 'language', 'description',  'classification', 'category', 'creationDate', 'lastModifiedDate'];
  dataSource: MatTableDataSource<Ticket>;
  filterValue: string;
  _paginator: MatPaginator;
  pageEvent: PageEvent;
  pageIndex: number = 0;
  pageSize: number =5;
  length: number;
  @ViewChild(MatPaginator, { static: false }) set matPaginator(paginator: MatPaginator) {
    this._paginator = paginator;
  }
  @ViewChild(MatSort) sort: MatSort;

  constructor(private ticketService: TicketService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getTicketsByUser();
  }

  getTicketsByUser(): void {
    this.ticketService.getTicketsByUser(this.pageIndex, this.pageSize).subscribe(data => {
      this.tickets = this.tickets.concat(data);
      console.log(this.tickets);
      this.dataSource = new MatTableDataSource(this.tickets);
      this.dataSource.paginator = this._paginator;
      this.dataSource.sort = this.sort;
      this.cdr.detectChanges();
      this.length = 100;
    });
  }

  nextPage(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    // if on this page there is atleast one row(ticket) then we don't make the api call.
    // otherwise, meaning that we don't have any rows(tickets), we make the api call.
    if (this.pageIndex * this.pageSize >= this.tickets.length)
      this.getTicketsByUser();
    this.length = 100;
  }


  applyFilter(event: any) {
    this.filterValue = event.target.value.toLowerCase();
    this.filterValue = this.filterValue.trim(); // Remove whitespace
    this.dataSource.filter = this.filterValue;
  }

}

