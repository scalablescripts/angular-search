import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/product';

@Component({
  selector: 'app-frontend',
  templateUrl: './frontend.component.html',
  styleUrls: ['./frontend.component.css']
})
export class FrontendComponent implements OnInit {
  products = [];
  filter = {
    s: '',
    sort: '',
    page: 1
  };
  perPage = 9;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get('http://localhost:8000/api/products/frontend').subscribe(
      (products: Product[]) => {
        this.products = products;
      }
    );
  }

  lastPage(products: Product[]): number {
    return Math.ceil(products.length / this.perPage);
  }
}
