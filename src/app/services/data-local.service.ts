import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  public noticias: Article[] = []
  
  constructor( private storage: Storage ) { }
  guardarNotica( noticia: Article){
    let existe = this.noticias.find( noti => noti.title === noticia.title )
    if(!existe){
      this.noticias.unshift( noticia )
      this.storage.set( "favoritos", this.noticias )
    }
  }
  cargarFavoritos(){

  }
}
