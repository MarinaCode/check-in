import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IndexService } from '../services/index.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent implements OnInit {
  @ViewChild('name') name: ElementRef;
  @ViewChild('cancel') closeBtn: ElementRef;
  @ViewChild('errorLabel') errorLabel: ElementRef;

  constructor(private indexService: IndexService) { }

  ngOnInit() {
    this.name.nativeElement.value = localStorage.getItem("currentUser") != null ? JSON.parse(localStorage.getItem("currentUser")).name : "";
  }

  updateComponent(result, position) {
    localStorage.setItem("currentUser", JSON.stringify(result));
    this.name.nativeElement.value = JSON.parse(localStorage.getItem("currentUser")).name;
    this.indexService.notifyApplyLocations({
      name: result.name,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
    this.closeBtn.nativeElement.click();
    this.indexService.notifyUpdateList();
  }

  checkIn() {
    var name = this.name.nativeElement.value;
    if (name.length > 0 && name.length <= 50 && /^[a-zA-Z]+$/.test(name)) {
      navigator.geolocation.getCurrentPosition((position)=> {
        if (localStorage.getItem("currentUser") == null) {
          this.indexService.checkIn(name, position.coords.latitude, position.coords.longitude).subscribe((result) => {
            this.updateComponent(result,position);
          })
        } else {
          var id = JSON.parse(localStorage.getItem("currentUser"))._id;
          this.indexService.updateCheckIn(id, name, position.coords.latitude, position.coords.longitude).subscribe((result) => {
            this.updateComponent(result,position);
          })
        }
      });
    } else {
        this.name.nativeElement.style.color = "#AF0000";
        this.name.nativeElement.style.border = "1px solid #AF0000";
        this.errorLabel.nativeElement.innerText = "The field allows to insert only letters with max 50 symbols";
        this.errorLabel.nativeElement.style.color = "#AF0000"
    }
  }


  onKey(e) {
    this.name.nativeElement.style.color = "#555";
    this.name.nativeElement.style.border = "1px solid #ccc";
    this.errorLabel.nativeElement.innerText = "";
  }
}
