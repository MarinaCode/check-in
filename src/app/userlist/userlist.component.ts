import { Component, OnInit } from '@angular/core';
import { IndexService } from '../services/index.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  private users_list: any = [];
  private count: any;

  constructor(private indexService: IndexService) {
    this.indexService.notifierSubjectUpdateList.subscribe(() => {this.ngOnInit()});
  }

  goNextPage(page) {
    var user = localStorage.getItem("currentUser");
    if (user) {
      var obj = JSON.parse(user);
      var id = obj._id;
      this.indexService.getNearByUsers(id, page).subscribe((result) => {
        this.users_list = result.result;
        this.count = Array(result.count).fill(0).map((x,i)=>i);
      })
    }
  }

  ngOnInit() {
    this.goNextPage(1);
  }
}
