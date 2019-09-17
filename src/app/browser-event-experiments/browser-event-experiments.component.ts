import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'browser-event-experiments',
  templateUrl: './browser-event-experiments.component.html',
  styleUrls: ['./browser-event-experiments.component.scss']
})
export class BrowserEventExperimentsComponent implements OnInit {

  hoverSection: HTMLElement;

  constructor() { }

  ngOnInit() {
    this.hoverSection = document.getElementById('hover');
    this.hoverSection.addEventListener('mousemove', mouseMove);
  }

  unsubscribe() {
    console.log('called unsubscribe.');
    this.hoverSection.removeEventListener('mousemove', mouseMove);
  }

}

function mouseMove(event: any) {
  console.log(event);
}
