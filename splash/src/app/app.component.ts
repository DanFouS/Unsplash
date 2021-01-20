import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

// import { Cloudinary } from module('../../../backend/uploads/cloudinary');
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // title = 'splash';
  url = '';
  images: any;
  constructor(private http: HttpClient) {}
  selectFile(event: any) {
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
        console.log(this.url);

        // this.http
        //   .post('http://localhost:5000/upload-images', {
        //     image: this.url,
        //   })
        //   .subscribe(
        //     (res) => console.log(res),
        //     (err) => console.log(err)
        //   );
      };
    }
  }
  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.images);
    this.http.post('http://localhost:5000/upload-images', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}
