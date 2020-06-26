import { Pipe, PipeTransform } from '@angular/core';
import {Post} from '../interfaces';

@Pipe({
  name: 'postFilter'
})
export class PostFilterPipe implements PipeTransform {

  transform(posts: Post[], filter: string = ''): Post[] {
    if (!filter.toLowerCase().trim()) {
      return posts;
    } else {
      return posts.filter(post => {
        return post.title.toLowerCase().includes(filter.toLowerCase());
      });
    }
  }
}
