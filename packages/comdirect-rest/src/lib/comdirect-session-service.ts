import {
  SessionV1GetSessionData,
  SessionV1GetSessionResponse,
  SessionV1PatchSessionData,
  SessionV1PatchSessionResponse,
  SessionV1PostSessionValidationData,
  SessionV1PostSessionValidationResponse
} from './types.gen';
import { CancelablePromise } from './core/CancelablePromise';
import { request as __request } from './core/request';
import { OpenAPI } from './core/OpenAPI';

export class ComdirectSessionService {
  /**
   * Returns the current Session-Objects for the specified client, can handle the literal "user" for the currently logged in client.
   * @param data The data for the request.
   * @param data.user The literal "user" or the UUID of the client.
   * @returns Session successful operation
   * @throws ApiError
   */
  public static sessionV1GetSession(data: SessionV1GetSessionData): CancelablePromise<SessionV1GetSessionResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/session/clients/{user}/v1/sessions',
      path: {
        user: data.user
      },
      errors: {
        500: 'Internal Server Error'
      }
    });
  }

  /**
   * Writes updates to a session
   * @param data The data for the request.
   * @param data.user The literal "user" or the UUID of the client.
   * @param data.session Reference to the session (UUID)
   * @param data.body
   * @returns Session successful operation
   * @throws ApiError
   */
  public static sessionV1PatchSession(data: SessionV1PatchSessionData): CancelablePromise<SessionV1PatchSessionResponse> {
    const headers = {};
    headers['x-once-authentication-info'] = JSON.stringify({id: data.id});

    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/session/clients/{user}/v1/sessions/{session}',
      path: {
        user: data.user,
        session: data.session
      },
      body: data.body,
      headers: headers,
      errors: {
        422: 'Unprocessable Entity',
        500: 'Internal Server Error'
      }
    });
  }

  /**
   * Validates the input and checks if the client is able to update the current session. An activated session TAN cannot be deactivated in the current session. It is necessary to provide a TAN when patching the activation of the session TAN.
   * @param data The data for the request.
   * @param data.user The literal "user" or the UUID of the client.
   * @param data.session Reference to the session (UUID)
   * @param data.body
   * @returns Session successful operation
   * @throws ApiError
   */
  public static sessionV1PostSessionValidation(data: SessionV1PostSessionValidationData): CancelablePromise<SessionV1PostSessionValidationResponse> {
    return new CancelablePromise((resolve, reject, onCancel) => {
      const requestPromise = __request(OpenAPI, {
        method: 'POST',
        url: '/api/session/clients/{user}/v1/sessions/{session}/validate',
        path: {
          user: data.user,
          session: data.session
        },
        body: data.body,
        responseHeader: 'x-once-authentication-info',
        errors: {
          422: 'Unprocessable Entity',
          500: 'Internal Server Error'
        }
      });

      // Attach cancel behavior if your CancelablePromise supports it
      if (onCancel) {
        onCancel(() => requestPromise.cancel());
      }

      requestPromise.then((response: string) => {
        resolve(<SessionV1PostSessionValidationResponse>JSON.parse(response));
      }).catch((error) => {
        reject(error);
      });
    });
  }

}
