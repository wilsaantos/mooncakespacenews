import { Article } from './../../models/article';
import { ApiSfnService } from './../../services/api-sfn.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { HomeDialogComponent } from './home-dialog/home-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  articles: Article[] = [];

  searchParam: string;

  constructor(
    private apiSfn: ApiSfnService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadArticles(10);
  }

  loadArticles(limit: number) {
    this.spinner.show();
    this.apiSfn.loadArticlesByLimit(limit).subscribe(articles => {
      this.articles = articles
      console.log(this.articles)
    }).add(() => this.spinner.hide())
  }

  openArticleDialog(article: Article) {
    const dialogRef = this.dialog.open(HomeDialogComponent,
      {
        width: 'auto',
        height: 'auto',
        maxHeight: '90%',
        data: article
      })
  }

  sortByDate(param: string) {
    if (param == 'newest') {
      this.articles = this.articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    } else {
      this.articles = this.articles.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime())
    }
  }

  search() {
    let searchedArticles = [];

    if (this.searchParam != null && this.searchParam != '') {
      this.articles.forEach(article => {
        const include = JSON.stringify(article).includes(this.searchParam)

        if (include) {
          searchedArticles.push(article)
        }
      })

      this.articles = searchedArticles;

    } else {
      this.loadArticles(10);
    }
  }

}
