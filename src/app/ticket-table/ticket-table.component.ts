import { ChangeDetectorRef, Component, OnInit, ViewChild,Input} from '@angular/core';
import { Ticket } from '../models/ticket';
import { TicketService } from '../service/tickets.service';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatFormField} from '@angular/material/form-field';   

@Component({
  selector: 'app-ticket-table',
  templateUrl: './ticket-table.component.html',
  styleUrls: ['./ticket-table.component.css']
})
export class TicketTableComponent implements OnInit {
  tickets: Ticket[] ;
  displayedColumns = ['id', 'subject', 'departmentId', 'email','phone', 'status','language','productId','description','assigneeId','classification','category','createdAt','updatedAt'];
  dataSource: MatTableDataSource<Ticket>;
  filterValue: string;
  _paginator: MatPaginator;
 

  @ViewChild(MatPaginator,  {static: false}) set matPaginator(paginator: MatPaginator) {
    this._paginator = paginator;
 
    if (this.dataSource) {
        this.dataSource.paginator = paginator;
    }
 }  @ViewChild(MatSort) sort: MatSort;

  constructor(private ticketService: TicketService, private cdr  : ChangeDetectorRef) { }

  

  ngOnInit(): void {
    
    this.ticketService.findAll().subscribe(data => {
      this.tickets = data;
      this.dataSource = new MatTableDataSource(this.tickets);
    });
    this.cdr.detectChanges();
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    setTimeout(() => this.dataSource.paginator = this._paginator);

  }
 
  

  // /**
  //  * Set the paginator and sort after the view init since this component will
  //  * be able to query its view for the initialized paginator and sort.
  //  */
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  applyFilter(event:any) {
    this.filterValue = event.target.value.toLowerCase();
    this.filterValue = this.filterValue.trim(); // Remove whitespace
    this.dataSource.filter = this.filterValue;
  }

}

