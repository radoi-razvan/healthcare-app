import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  title: string = 'Patients Management';

  constructor() {}

  ngOnInit(): void {}

  toggleAddPatient(): void {
    console.log('toggle');
  }
}
