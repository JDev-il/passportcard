import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from 'src/app/core/models/Post.interface';
import { Observable, Subject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  posts: Observable<Post[]>[] = [];

  private readonly searchSubject = new Subject<string | undefined>();


  constructor(private apiService: ApiService) {
  }

  postsSearchHandler(searchQuery: string){
  this.searchSubject.next(searchQuery?.trim());
  }




}
