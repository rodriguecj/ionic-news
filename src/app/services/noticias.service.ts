import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadLine } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey 
const apiUrl = environment.apiUrl
const headers = new HttpHeaders({
  "X-Api-Key": apiKey
})

@Injectable({
  providedIn: 'root'
})
export class NoticiasService implements OnInit{

  public headLinesPage = 0;
  public categoriaActual = "";
  public categoriaPage = 0;
  constructor( private http: HttpClient) { }

  ngOnInit(){

  }
  private ejecutarQuery<T>( query: string){
    query = apiUrl + query;
    return this.http.get<T>(query, { headers })
  }
  getTopHeadLine(){
    this.headLinesPage++
    return this.ejecutarQuery<RespuestaTopHeadLine>(`/top-headlines?country=us&page=${ this.headLinesPage }`)
    //return this.http.get<RespuestaTopHeadLine>('https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=7a68c05bdd46401dba644a6c2a3cd517')
  }
  getTopHeadLineCategory( category: string){
    if(this.categoriaActual === category ){

      this.categoriaPage++
    }else{
      this.categoriaPage = 1
      this.categoriaActual = category
    }
    console.log(this.categoriaPage)
    //return this.http.get<RespuestaTopHeadLine>('https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=7a68c05bdd46401dba644a6c2a3cd517')
    return this.ejecutarQuery<RespuestaTopHeadLine>(`/top-headlines?country=us&category=${ category }&page= ${this.categoriaPage}`)
  }
}
