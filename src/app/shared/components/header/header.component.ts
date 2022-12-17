import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Post } from 'src/app/core/models/Post.interface';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'Header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() postsFromPostsComponent: Post[] = [];
  @Output() sendFilteredValue = new EventEmitter;
  headeSubscription!: Subscription

  constructor() { }

  ngOnInit(): void {
  }

}
