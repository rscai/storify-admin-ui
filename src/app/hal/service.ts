
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Link, HalCollection } from './hal';


export abstract class HalService<T> {
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http,  private restEndpoint: string ,
    private resourceName: string) {

  }

  collection(page: number, size: number): Promise<HalCollection<T>> {
    return this.http.get(this.restEndpoint + "/" + this.resourceName)
      .toPromise().then(response =>
        response.json() as HalCollection<T>)
      .catch(this.handleError);
  }
  collectionLink(link: Link): Promise<HalCollection<T>> {
    return this.http.get(link.href).toPromise().then(
      response =>
      response.json() as HalCollection<T>)
      .catch(this.handleError);
  }
  

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
