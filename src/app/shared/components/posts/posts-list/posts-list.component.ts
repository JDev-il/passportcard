import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { FormControl, FormGroup } from "@angular/forms";
import { Observable, Subject, Subscription, debounceTime, distinctUntilChanged, filter, fromEvent, map, of, switchMap, tap } from 'rxjs';
import { Cat, Post } from 'src/app/core/models/Post.interface';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'PostsList',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() isLoading: boolean = true

  @ViewChild('input') input!: ElementRef
  postsSubscription!: Subscription;
  searchSubscription!: Subscription;

  posts: Post[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getAllPosts();
    // this.apiService2
    //   .getCats(this.page)
    //   .subscribe((cats: Cat[]) => {
    //     this.cats = cats;
    //   });
  }

  public onSearchPost(input: any): void {
  }

  onScroll(): void {
  }


  isLoadingStateHanlder(isLoading: boolean){
    this.isLoading = isLoading
  }

  ngAfterViewInit(): void {
    this.postsSubscription = this.apiService.postsList$.subscribe(posts=>{
      this.posts = posts
    })
  }
  ngOnDestroy(): void {
  }
}
