import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Post} from '../../../../shared/interfaces';
import {PostsService} from '../../../../core/services/posts.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit, OnDestroy {
  // post form
  form = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
    author: ['', Validators.required],
  });
  // variables
  ngUnsubscribe = new Subject();

  constructor(private fb: FormBuilder,
              private postsService: PostsService,
              private alertService: AlertService) {
  }

  ngOnInit(): void {
  }


  submit(): Post {
    if (this.form.invalid) {
      return;
    } else {
      const post: Post = {
        title: this.form.value.title,
        content: this.form.value.content,
        author: this.form.value.author,
        date: new Date()
      };

      this.postsService.createPost(post)
        .pipe(
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe(() => {
          this.form.reset();
          this.alertService.success('Post was created');
        }, (error) => {
          console.log(error);
        });
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.unsubscribe();
  }
}
