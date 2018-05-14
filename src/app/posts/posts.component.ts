import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { DataService } from '../services/data.service';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import {  BadInputError } from '../common/bad-input';
import { PostService } from '../services/post.service';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any [];

  constructor(private service : PostService) { }

  ngOnInit() {
    this.service.getAll()
    .subscribe(post=> this.posts=post);
  }

  createPost(resource : HTMLInputElement){
    console.log(resource. value);
    let post={title: resource.value};
    this.posts.splice(0,0,post);

    resource.value="";

    this.service.create(post)
      .subscribe(response=>{
        post['id']=response.id;
        // post['id']=post;
      },
      (error:AppError)=>{
        this.posts.splice(0,1);

        if(error instanceof BadInputError){
          alert('invalid input');
        }else{
          alert('Unexpected error occurd');
        }

      });

  }

  uppdatePost(resource : HTMLInputElement){
    this.service.update(resource)
      .subscribe(post=>{
        console.log(post);
      });
  }

  deletePost(id : HTMLInputElement){
    let index=this.posts.indexOf(id);
    this.posts.splice(index, 1);

    this.service.delete(id.id)
    .subscribe(null, 
      (error: AppError)=>{
      this.posts.splice(index, 0, id);
      
      if(error instanceof NotFoundError){
        alert('this post is already deleted');
      }
    });

  }

}
