import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/core/models/Post.interface';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'PostsList',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() isLoading: boolean = true;

  postsSubscription!: Subscription;
  posts: Post[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getAllPosts();
  }

  onScroll(): void {
    this.postsSubscription = this.apiService.postsList$.subscribe((posts: Post[]) => {
      this.posts = [...this.posts, ...posts]
    })
  }
  deletePost(post: Post) {
    this.apiService.deletePost(post);
  }
  isLoadingStateHanlder(isLoading: boolean) {
    this.isLoading = isLoading
  }

  ngAfterViewInit(): void {
    this.postsSubscription = this.apiService.postsList$.subscribe(posts => {
      this.posts = posts
    })
  }
  ngOnDestroy(): void {
    this.postsSubscription.unsubscribe()
  }
}
