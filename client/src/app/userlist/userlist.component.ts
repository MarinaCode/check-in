import { Component, OnInit } from '@angular/core';
import { IndexService } from '../services/index.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  private users_list:any = [];

  constructor(private indexService: IndexService) {
    this.indexService.notifierSubjectUpdateList.subscribe(() => {this.ngOnInit()});
  }

  ngOnInit() {
    var user = localStorage.getItem("currentUser");
    if (user) {
      var obj = JSON.parse(user);
      var lat = obj.loc[0];
      var lng = obj.loc[1];
      var id = obj._id;
      this.indexService.getUsers(lat, lng, id).subscribe((result) => {
        this.users_list = result;
      })
    }
  }
}
