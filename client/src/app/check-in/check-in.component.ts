import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IndexService } from '../services/index.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent implements OnInit {
  @ViewChild('name') name: ElementRef;

  constructor(private indexService: IndexService) { }

  ngOnInit() {
    this.name.nativeElement.value = localStorage.getItem("currentUser") != null ? JSON.parse(localStorage.getItem("currentUser")).name : "";
  }

  checkIn() {
    var name = this.name.nativeElement.value;
    if (name.length > 0 && name.length <= 50 && /^[a-zA-Z]+$/.test(name)) {
      navigator.geolocation.getCurrentPosition((position)=> {
        if (localStorage.getItem("currentUser") == null) {
          this.indexService.checkIn(name, position.coords.latitude, position.coords.longitude).subscribe((result) => {
            localStorage.setItem("currentUser", JSON.stringify(result));
            this.name.nativeElement.value = JSON.parse(localStorage.getItem("currentUser")).name;
            this.indexService.notifyApplyLocations({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          })
        } else {
          var id = JSON.parse(localStorage.getItem("currentUser"))._id;
          this.indexService.updateCheckIn(id, name, position.coords.latitude, position.coords.longitude).subscribe((result) => {
            localStorage.setItem("currentUser", JSON.stringify(result));
            this.name.nativeElement.value = JSON.parse(localStorage.getItem("currentUser")).name;
            this.indexService.notifyApplyLocations({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          })
        }
      });
    } else {
      //TODO show error
    }
  }
}
