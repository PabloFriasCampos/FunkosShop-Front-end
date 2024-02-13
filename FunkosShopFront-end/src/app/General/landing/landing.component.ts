import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

  constructor() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        const flecha = document.getElementById('scroll-hint');
        if (flecha) {
          flecha.style.display = 'none'
        }
      }
    })
  }

  scrollDown() {
    window.scrollTo({ top: 300, behavior: 'smooth' });

    const flecha = document.getElementById('scroll-hint');
    if (flecha) {
      flecha.style.display = 'none'
    }
  }

}
