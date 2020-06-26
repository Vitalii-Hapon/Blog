import {Component, OnInit} from '@angular/core';
import {PostsService} from '../../../../core/services/posts.service';
import {ActivatedRoute, Params} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {switchMap, takeUntil} from 'rxjs/operators';
import {Post} from '../../../../shared/interfaces';
import {Subject} from 'rxjs';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  // post form
  form = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
  });
  // variables
  ngUnsubscribe = new Subject();
  submitted: boolean;
  post: Post;

  constructor(private postsService: PostsService,
              private router: ActivatedRoute,
              private fb: FormBuilder,
              private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.router.params
      .pipe(
        switchMap((params: Params) => {
          return this.postsService.getPostById(params.id);
        })
      )
      .subscribe((post: Post) => {
        this.post = post;
        this.form.patchValue(post);
      }, error => console.log(error));
  }

  submit(): Post {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    this.postsService.editPost({
      ...this.post,
      title: this.form.value.title,
      content: this.form.value.content,
      date: new Date()
    })
      .pipe(
        takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.submitted = false;
        this.alertService.warning('Post has been changed');
      }, error => {
        this.submitted = false;
        console.log(error);
      });
  }
}
