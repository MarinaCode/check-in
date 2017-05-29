import { Component, OnInit } from '@angular/core';
import { IndexService } from '../services/index.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  private users_list:any = [];

  constructor(private indexService: IndexService) { }

  ngOnInit() {
    this.indexService.getUsers().subscribe((result) => {
      this.users_list = result;
    })

  }

}
