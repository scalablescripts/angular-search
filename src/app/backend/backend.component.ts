import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Product} from '../models/product';
import {Filter} from '../models/filter';

@Component({
  selector: 'app-backend',
  templateUrl: './backend.component.html',
  styleUrls: ['./backend.component.css']
})
export class BackendComponent implements OnInit {
  products = [];
  filter = {
    s: '',
    sort: '',
    page: 1
  };
  lastPage = 0;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.load(this.filter);
  }

  load(filter: Filter): void {
    this.filter = filter;

    let params = new HttpParams();

    if (filter.s) {
      params = params.set('s', filter.s);
    }

    if (filter.sort) {
      params = params.set('sort', filter.sort);
    }

    if (filter.page) {
      params = params.set('page', filter.page.toString());
    }

    this.http.get('http://localhost:8000/api/products/backend', {
      params
    }).subscribe(
      (response: any) => {
        this.products = filter.page === 1 ? response.data : [...this.products, ...response.data];
        this.lastPage = response.last_page;
      }
    );
  }

  setFilters(filter: Filter): void {
    this.load(filter);
  }
}
