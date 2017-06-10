
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Link, HalCollection, HalJson } from './hal';


export abstract class HalService<T extends HalJson> {
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http, private restEndpoint: string,
    private resourceName: string) {

  }

  collection(page: number, size: number): Promise<HalCollection<T>> {
    return this.http.get(this.restEndpoint + "/" + this.resourceName)
      .toPromise().then(response =>
        response.json() as HalCollection<T> || {})
      .catch(this.handleError);
  }
  collectionLink(link: Link): Promise<HalCollection<T>> {
    return this.http.get(link.href)
      .toPromise().then(response =>
        response.json() as HalCollection<T> || {})
      .catch(this.handleError);
  }

  findOne(id: string): Promise<T> {
    return this.http.get(this.restEndpoint + "/" + this.resourceName + "/" + id)
      .toPromise().then(response =>
        response.json() as T || {}
      ).catch(this.handleError);
  }

  create(entity: T): Promise<T> {
    return this.http.post(this.restEndpoint + "/" + this.resourceName, entity, new RequestOptions({ headers: this.headers }))
      .toPromise().then(response => response.json() as T || {})
      .catch(this.handleError);
  }

  update(entity: T): Promise<T> {
    return this.http.put(entity._links.self.href, entity, new RequestOptions({ headers: this.headers }))
      .toPromise().then(response => response.json() as T || {})
      .catch(this.handleError);
  }

  delete(entity: T): Promise<T> {
    return this.http.delete(entity._links.self.href)
    .toPromise().then(response=> entity)
    .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
