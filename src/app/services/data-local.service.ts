import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  public noticias: Article[] = []
  
  constructor( private storage: Storage ) {
    this.cargarFavoritos()
   }
  guardarNotica( noticia: Article){
    let existe = this.noticias.find( noti => noti.title === noticia.title )
    if(!existe){
      this.noticias.unshift( noticia )
      this.storage.set( "favoritos", this.noticias )
    }
  }
  async cargarFavoritos(){
    const favoritos = await this.storage.get("favoritos")  
     /* console.log("Esto son los favoritos", favoritos) */ 
     if( favoritos ){
       this.noticias = favoritos        
     }
    
   /*  this.storage.get("favoritos").then( favoritos=>{
      console.log("Cargar favoritos", favoritos)
    } )*/
  }
  borrarNoticia( noticia: Article){
    this.noticias = this.noticias.filter( noti=> {noti.title !== noticia.title})
    this.storage.set( "favoritos", this.noticias )
  }
}
