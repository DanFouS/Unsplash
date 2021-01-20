import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import { Cloudinary } from module('../../../backend/uploads/cloudinary');
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // title = 'splash';
  url = '';
  constructor(private http: HttpClient) {}
  selectFile(event: any) {
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
        //console.log(this.url);

        this.http
          .post('http://localhost:5000/upload-images', {
            image: this.url,
          })
          .subscribe();
      };
    }
  }
}
