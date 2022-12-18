import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, fromEvent, map, Observable, Subject, throwIfEmpty } from 'rxjs';
import { Post } from 'src/app/core/models/Post.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private postsListSource: BehaviorSubject<Post[]> = new BehaviorSubject(<Post[]>[]);
  public readonly postsList$ = this.postsListSource.asObservable();

  private get _paths() {
    return {
      baseUrl: environment.serverUrl,
      allPosts: `posts`,
      singlePost: `posts/:post_id`,
      byUserId: `posts?userId=:userId`
    };
  }

  private cachedPosts: Post[] = [];
  private currentFilteredPosts: Post[] = [];


  constructor(private http: HttpClient) {}

  private async verifyAuth() {
    this.http.post(`${this._paths.baseUrl}auth`, {}).pipe(map(res => res))
  }

  async getAllPosts() { // localhost:3000
    await this.verifyAuth();
    this.http.get(`${this._paths.baseUrl}${this._paths.allPosts}`).pipe(map((data: any) => data)).subscribe((posts: Post[]) => { /** posts = 100 faked posts from https://jsonplaceholder.typicode.com/  */
      this.cachedPosts = [...this.cachedPosts, ...posts];
      this.postsListSource.next(posts);
    })
  }

  async getFilteredPostsByQuery(query: string) { // cached posts
    const cachedListOfPost: Post[] = [...this.cachedPosts];
    this.postsListSource.next([]);
    this.currentFilteredPosts = []
    if (!query) {
      this.postsListSource.next(this.cachedPosts)
      return;
    }
    cachedListOfPost.filter(post => {
      if (query.match(post.title)) {
        this.currentFilteredPosts = [post];
        return;
      }
      if (post.title.includes(query)) {
        this.currentFilteredPosts = [...this.currentFilteredPosts, post];
      }
    })
    this.postsListSource.next(this.currentFilteredPosts);
  }


  deletePost(post: Post) {
    if (this.postsListSource.getValue().length < 1) {
      this.postsListSource.next([]);
    }
    const url = `${this._paths.baseUrl}${this._paths.singlePost.replace(':post_id', String(post.id))}`
    this.http.post(url, { post: post }).pipe(response => response).pipe(map((postsData: any) => postsData)).subscribe((posts: Post[]) => {
      this.cachedPosts = [...posts]
      this.postsListSource.next(this.cachedPosts);
    })
  }
}


