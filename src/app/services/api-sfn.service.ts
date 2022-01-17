import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models/article';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiSfnService {

  baseUrl = "https://api.spaceflightnewsapi.net/v3"

  constructor(
    private http: HttpClient
  ) { }

  loadArticlesByLimit(limit: number) : Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}/articles?_limit=${limit}`)
  }
}
