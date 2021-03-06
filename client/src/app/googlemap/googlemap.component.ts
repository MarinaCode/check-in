import { Component, OnInit } from '@angular/core';
import { IndexService } from '../services/index.service';
declare var google: any;
@Component({
  selector: 'app-googlemap',
  templateUrl: './googlemap.component.html',
  styleUrls: ['./googlemap.component.css']
})
export class GooglemapComponent implements OnInit {
  latitude: any;
  longitude: any;
  map: any;

  constructor(private indexService: IndexService) {
    this.indexService.notifierSubjectsetLocations.subscribe((position) => {this.setGeoLocations(position.name, position.latitude, position.longitude)});
  }

  ngOnInit() {
    var currentUser = localStorage.getItem("currentUser");
    var options = {
      zoom: 7,
      center: {lat: 41.85, lng: -87.65}
    }
    if (currentUser) {
      var position = JSON.parse(currentUser).loc;
      options.center = {lat: position[0], lng: position[1]};
    }

    this.map = new google.maps.Map(document.getElementById('map'), options);
    if (currentUser) {
      this.setGeoLocations(JSON.parse(currentUser).name, position[0], position[1]);
    }
  }

  setGeoLocations(name, latitude, longitude) {
    var geolocate = new google.maps.LatLng(latitude, longitude);
    var marker = new google.maps.Marker({
      position: geolocate,
      map: this.map
    });
    var infowindow = new google.maps.InfoWindow({
      content: "Name:" + name + "</br> latitude: " + latitude + "</br>" + "longitude: " + longitude
    });
    marker.addListener('click', function() {
      infowindow.open(this.map, marker);
    });
    this.map.setCenter(geolocate);
  }
}
