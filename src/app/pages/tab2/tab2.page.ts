import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  @ViewChild(IonSegment) segment: IonSegment

  public categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology']
  public noticias: Article[] = []

  constructor( private noticiasService:NoticiasService) {}
  ngOnInit(){
    this.segment.value = this.categorias[0];
    /* this.noticiasService.getTopHeadLineCategory(this.categorias[0]).subscribe(
      response=>{
        console.log(response)
        this.noticias.push(...response.articles)
      }
    ) */
    this.cargarNoticias(this.categorias[0])
  }
  cambioCategoria(event){
    console.log(event)
    this.noticias = []
    this.cargarNoticias(event.detail.value)
  }
  cargarNoticias( categoria:string, event? ){
    this.noticiasService.getTopHeadLineCategory(categoria).subscribe(
      response=>{
        console.log(response)
        this.noticias.push(...response.articles)
        if(event){
          event.target.complete()
        }
      }
    )
  }
  loadData(event){
    this.cargarNoticias(this.segment.value, event)
  }
}
