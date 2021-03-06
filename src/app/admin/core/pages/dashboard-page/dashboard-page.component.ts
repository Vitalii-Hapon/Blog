import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from '../../../../shared/interfaces';
import {PostsService} from '../../../../core/services/posts.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  // variables
  posts: Post[] = [];
  ngUnsubscribe = new Subject();
  // formControl for pipes
  filter = new FormControl('');

  constructor(private postsService: PostsService,
              private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.postsService
      .getPosts()
      .pipe(
        takeUntil(this.ngUnsubscribe))
      .subscribe(
        (posts) => {
          this.posts = posts;
        }, error => {
          console.log(error);
        }
      );
  }

  remove(id: string) {
    this.postsService
      .removePost(id)
      .pipe(
        takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.posts = this.posts.filter( (item) => item.id !== id);
        this.alertService.danger('Post has been deleted');
      }, (error => {
        console.log(error);
      }));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.unsubscribe();
  }
}
