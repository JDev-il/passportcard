import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, fromEvent, map, Observable, Subject, throwIfEmpty } from 'rxjs';
import { Cat, Post } from 'src/app/core/models/Post.interface';
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
  public initialPosts: Post[] = []

  currentFilteredPosts: Post[] = [];

  constructor(private http: HttpClient) { }

  // getCats(page: number): Observable<Cat[]> {
  //   return this.http.get(
  //     `https://api.thecatapi.com/v1/breeds?page=${page}&limit=5`
  //   ) as Observable<Cat[]>;
  // }


  getAllPosts() { // localhost:3000
    this.http.get(`${this._paths.baseUrl}${this._paths.allPosts}`).pipe(map((data: any) => data)).subscribe((posts: Post[]) => { /** posts = 100 faked posts from https://jsonplaceholder.typicode.com/  */
      this.cachedPosts = [...this.cachedPosts, ...posts];
      this.postsListSource.next(posts);
    })
  }

  async getFilteredPostsByQuery(query: string) { // cached
    const cachedListOfPost: Post[] = [...this.cachedPosts];
    this.postsListSource.next([]);
    if (!query) {
      this.currentFilteredPosts = []
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
    this.currentFilteredPosts = []
  }

}

    // const url = `${this._paths.baseUrl}${this._paths.byUserId.replace(":userId", String(userId))}`
