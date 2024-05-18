import { AuthCredentials, OAuthData, OAuthResponse } from './types.gen';
import { OpenAPI } from './core/OpenAPI';
import { CancelablePromise } from './core/CancelablePromise';
import { request as __request } from './core/request';

export class ComdirectAuthService {

  public static getAuthCredentials() {
    return <AuthCredentials>{
      'client_id': OpenAPI.CLIENT_ID,
      'client_secret': OpenAPI.CLIENT_SECRET,
      'username': OpenAPI.USERNAME,
      'password': OpenAPI.PASSWORD,
      'grant_type': 'password'
    };
  }

  public static getAuthCredentialsSecondaryFlow() {
    return <AuthCredentials>{
      'client_id': OpenAPI.CLIENT_ID,
      'client_secret': OpenAPI.CLIENT_SECRET,
      'token': OpenAPI.TOKEN,
      'grant_type': 'cd_secondary'
    };
  }

  public static buildFormData(data) {
    const formData = new URLSearchParams();
    for (let property in data) {
      formData.append(property, data[property]);
    }
    return formData.toString();
  }

  /**
   *
   * @param data The data for the request.
   * @param data.user The literal "user" or the UUID of the client.
   * @returns Session successful operation
   * @throws ApiError
   */
  public static oauthToken(data: OAuthData): CancelablePromise<OAuthResponse> {
    const bodyString = ComdirectAuthService.buildFormData(data.formData);

    return __request(OpenAPI, {
      method: 'POST',
      url: '/oauth/token',
      withoutAuthorization: true,
      // for some reason that doesn't work
      // formData: data.formData,
      mediaType: 'application/x-www-form-urlencoded',
      body: bodyString,
      errors: {
        500: 'Internal Server Error'
      }
    });
  }

}
