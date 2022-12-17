import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Subject, Subscription, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-search-post',
  templateUrl: './search-post.component.html',
  styleUrls: ['./search-post.component.scss'],
})
export class SearchPostComponent implements OnInit, OnDestroy {

  @Output() currentLoadingState = new EventEmitter;

  private readonly searchSubject: Subject<string> = new Subject();

  searchSubscription!: Subscription;
  searchResults: unknown;
  searchInputValue!: string

  constructor(private dataService: DataService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.searchSubscription = this.searchSubject
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((searchQuery) => this.apiService.getFilteredPostsByQuery(searchQuery)))
      .subscribe((results: any) => {
        this.currentLoadingState.emit(true)
        this.searchResults = results
      })
  }

  searchTerm(query: Event): void {
    const searchQuery = (query.target as HTMLInputElement).value;
    this.currentLoadingState.emit(false)
    this.searchSubject.next(searchQuery);
  }

  clearInput(){
    this.searchInputValue = ''
    this.apiService.getFilteredPostsByQuery(this.searchInputValue)
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }
}
