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
        return imageData;
      }
    )

  }

  bs4toBlob(b64Data: string, contentType: string, sliceSize: number) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for(var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset = sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

}
