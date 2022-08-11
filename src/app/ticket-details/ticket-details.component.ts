import { Component, OnInit,Input } from '@angular/core';
import { TicketService } from '../service/tickets.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {

  closeResult = '';
  fileName = '';
  form: FormGroup;
  

  constructor(private ticketService: TicketService, private modalService: NgbModal,) {  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      subject: new FormControl(''),
      description: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      classification: new FormControl(''),
      category: new FormControl(''),
      language: new FormControl(''),
      departmentId: new FormControl(''),
      contactId: new FormControl(''),
      assigneeId: new FormControl(''),
      status: new FormControl('')
    });
  }

  //add ticket from form
  addTicket(): any {

    this.ticketService.save(this.form.value).subscribe(

      (erreur) => console.log(erreur)

    )
  }

  onFileSelected(event: any) {

    const file: File = event.target.files[0];
    this.ticketService.uploadFile(file, "753510000000311001").subscribe(
      (erreur) => console.log(erreur));
  }

}





