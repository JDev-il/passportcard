import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'Search',
  templateUrl: './search-post.component.html',
  styleUrls: ['./search-post.component.scss'],
})
export class SearchPostComponent implements OnInit, AfterViewInit, OnDestroy {

  @Output() currentLoadingState = new EventEmitter;

  private readonly searchSubject: Subject<string> = new Subject();
  searchSubscription!: Subscription;
  searchInputValue: string | any = localStorage.getItem('query');

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.searchSubscription = this.searchSubject
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((searchQuery) => this.apiService.getFilteredPostsByQuery(searchQuery)))
      .subscribe(_ => {
        this.currentLoadingState.emit(true);
      })
  }

  searchTerm(query: Event): void {
    const searchQuery = (query.target as HTMLInputElement).value;
    localStorage.setItem("query", searchQuery);
    this.currentLoadingState.emit(false)
    this.searchSubject.next(searchQuery);
  }

  clearInput() {
    localStorage.removeItem('query')
    this.searchInputValue = ''
    this.searchSubject.next(this.searchInputValue);
  }

  ngAfterViewInit(): void {
    if (this.searchInputValue) {
      this.searchSubject.next(this.searchInputValue);
    }
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }
}
