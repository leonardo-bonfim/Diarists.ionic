import { Injectable } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';

import { ApiRequestService } from './api-request.service';

@Injectable({
  providedIn: 'root'
})
export class ImagemService {

  constructor(
    private camera: Camera,
    private requestService: ApiRequestService,
  ) { }

  async takePhoto(sourceType: number) {
    const options: CameraOptions = {
      quality: 10,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: sourceType,
    }

    return await this.camera.getPicture(options).then(
      imageData => {
        return this.bs4ToImage(imageData);
      }
    )

  }

  public bs4ToImage(data) {
    return 'data:image/jpeg;base64,' + data;
  }

}
