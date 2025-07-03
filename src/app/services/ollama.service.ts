import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OllamaService {
  private baseUrl = 'http://localhost:11434/api';

  constructor(private http: HttpClient) {}

  generate(model: string, prompt: string): Observable<any> {
    const body = {
      model,
      prompt,
      stream: false
    };
    return this.http.post(`${this.baseUrl}/generate`, body);
  }
}
