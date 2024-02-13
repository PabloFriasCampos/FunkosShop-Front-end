import { Component } from '@angular/core';

@Component({
  selector: 'app-sobre-nosotros',
  templateUrl: './sobre-nosotros.component.html',
  styleUrls: ['./sobre-nosotros.component.css']
})
export class SobreNosotrosComponent {

  constructor() {
    window.scrollTo({ top: 0 });
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
