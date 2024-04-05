import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data/data.service';
import { SearchService } from '../../services/search/search.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  filteredUsers: User[] = [];
  currentPage: number = 1;
  private searchSubscription!: Subscription;

  constructor(
    private dataService: DataService,
    private searchService: SearchService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchUsers(this.currentPage);
    this.searchSubscription = this.searchService.search$.subscribe((term) => {
      this.filterUsers(term);
    });
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

  fetchUsers(page: number) {
    this.dataService.getUsers(page).subscribe((users: User[]) => {
      this.users = users;
      this.filterUsers(this.searchService.currentSearchTerm);
    });
  }

  filterUsers(searchTerm: string = '') {
    this.filteredUsers = searchTerm
      ? this.users.filter((user) =>
          user.id.toString().includes(searchTerm.trim())
        )
      : this.users;
  }

  onUserSelect(userId: number) {
    this.router.navigate(['/user', userId]);
  }
}
