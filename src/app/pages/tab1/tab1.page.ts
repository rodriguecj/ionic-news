import { Component } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public noticias: Article[] = []
  constructor( private noticiasSerivices: NoticiasService) {}
  ngOnInit(){
    /* this.noticiasSerivices.getTopHeadLine().subscribe(
      response =>{
        console.log('Noticias', response)
        this.noticias.push( ...response.articles )
      }
    ) */
    this.cargarNoticias()
  }
  loadData(event){
    console.log(event)
    this.cargarNoticias(event)
  }
  cargarNoticias( event?){
    this.noticiasSerivices.getTopHeadLine().subscribe(
      response =>{
        console.log('Noticias', response)
        if(response.articles.length == 0){
          event.target.disabled = true
          event.target.complete()
          return
        }
        this.noticias.push( ...response.articles )
        if(event){
          event.target.complete()
        }
      }
    )
  }

}
