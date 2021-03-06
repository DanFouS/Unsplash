import { Component } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { images } from './images';

// import { Cloudinary } from module('../../../backend/uploads/cloudinary');
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // title = 'splash';
  url = '';
  selectedFile: any = File;
  datas = [];
  imageDirectoryPath: any = 'http://localhost:5000/upload-images';
  private _url: string =
    'C:/Users/PC/Desktop/mysplash/backend/modules/datas.js';
  constructor(private http: HttpClient) {}
  onFileSelected(event: any) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    }
    this.selectedFile = <File>event.target.files[0];
  }
  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.http
      .post('http://localhost:5000/upload-images', fd, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          console.warn('uploading');
        } else if (event.type === HttpEventType.Response) {
          console.warn('uploaded');
        }
        console.warn(event);
      });
  }
}
