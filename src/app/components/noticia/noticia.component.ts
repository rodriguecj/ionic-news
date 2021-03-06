import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  @Input() enFavoritos;
  
  @Input() noticia: Article
  @Input() indice:number
  constructor(private iab: InAppBrowser,
               public actionSheetController: ActionSheetController,
                private socialSharing: SocialSharing,
                private dataLocalService: DataLocalService ) { }

  ngOnInit() {}

  abrirNoticia(){
    //console.log(this.noticia.url)
    const browser = this.iab.create(this.noticia.url, '_system');
  }
  async lanzarMenu(){

    let guardarBorrarBtn;

    if( this.enFavoritos ){
      //Borrar de favoritos
      guardarBorrarBtn = {
        text: 'Borrar favorito',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          this.dataLocalService.borrarNoticia(this.noticia)
          console.log('Borrar de favoritos');
        }
      }
    }else{
      guardarBorrarBtn = {
        text: 'Favorito',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          this.dataLocalService.guardarNotica(this.noticia)
          console.log('Favorito');
        }
      }
    }

    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Share clicked');
           this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            "",
            this.noticia.url
          ); 
        }
      }, 
      guardarBorrarBtn, 
     {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
