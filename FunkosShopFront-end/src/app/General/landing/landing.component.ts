import { Component } from '@angular/core';
import { LoggedService } from 'src/app/Services/logged.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

  constructor(private loggedService: LoggedService) { }

  logged(): boolean {
    return this.loggedService.logged()

  }

}
