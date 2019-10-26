
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Link, HalCollection, HalJson } from './hal';


export abstract class HalService<T extends HalJson> {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private restEndpoint: string,
    private resourceName: string) {

  }

  collection(page: number, size: number): Observable<HalCollection<T>> {
    return this.http.get<HalCollection<T>>(this.restEndpoint + '/' + this.resourceName + '?page=' + page + '&size=' + size);
  }
  collectionLink(link: Link): Observable<HalCollection<T>> {
    return this.http.get<HalCollection<T>>(link.href);
  }

  findOne(id: string): Observable<T> {
    return this.http.get<T>(this.restEndpoint + '/' + this.resourceName + '/' + id);
  }

  findOneByLink(link: Link): Observable<T> {
    return this.http.get<T>(link.href);
  }

  create(entity: T): Observable<T> {
    return this.http.post<T>(this.restEndpoint + '/' + this.resourceName, entity, { headers: this.headers });
  }

  update(entity: T): Observable<T> {
    return this.http.put<T>(entity._links.self.href, entity, { headers: this.headers });
  }

  updateLink(link: Link, links: Link[]): Observable<{}> {
    const content: string = links.map((e: Link) => e.href).join('\n');
    return this.http.put<{}>(link.href, content, {
      headers: new HttpHeaders({ 'Content-Type': 'text/uri-list' })
    });
  }

  delete(entity: T): Observable<{}> {
    return this.http.delete(entity._links.self.href);
  }
}
