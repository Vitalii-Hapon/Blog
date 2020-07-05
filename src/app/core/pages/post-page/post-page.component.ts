import {Component, OnInit} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, Params} from '@angular/router';
import {Observable} from 'rxjs';
import {Post} from '../../../shared/interfaces';
import {PostsService} from '../../services/posts.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post$: Observable<Post>;

  constructor(private postsService: PostsService,
              private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.post$ = this.router.params
      .pipe(
        switchMap((params: Params) => {
          return this.postsService.getPostById(params.id);
        })
      );
  }

}
