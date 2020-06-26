import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FbPostResponse, Post} from '../../shared/interfaces';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) {
  }

  getPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(`${environment.fbDbUrl}/posts.json`)
      .pipe(
        map((response: {[key: string]: any }) => {
          return Object
            .keys(response)
            .map(key => ({
              ...response[key],
              id: key,
              date: new Date(response[key].date)
            }));
        }));
  }

  getPostById(id: string): Observable<Post> {
    return this.http
      .get<Post>(`${environment.fbDbUrl}/posts/${id}.json`)
      .pipe(
        map((post: Post) => {
          return ({
            ...post, id,
            date: new Date(post.date)
          });
        }));
  }

  createPost(post: Post): Observable<Post> {
    return this.http
      .post(`${environment.fbDbUrl}/posts.json`, post)
      .pipe(
        map((response: FbPostResponse) => {
          return {
            ...post,
            id: response.name,
            date: new Date(post.date)
          };
        }));
  }

  editPost(post: Post): Observable<void> {
    return this.http
      .patch<void>(`${environment.fbDbUrl}/posts/${post.id}.json`, {
      title: post.title,
      content: post.content,
      date: new Date(post.date),
    });
  }

  removePost(id: string): Observable<void> {
    return this.http
      .delete<void>(`${environment.fbDbUrl}/posts/${id}.json`);
  }
}
