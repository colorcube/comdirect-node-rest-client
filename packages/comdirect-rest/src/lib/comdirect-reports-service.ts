import { ReportsV1GetParticipantBalancesData, ReportsV1GetParticipantBalancesResponse } from './types.gen';
import { CancelablePromise } from './core/CancelablePromise';
import { request as __request } from './core/request';
import { OpenAPI } from './core/OpenAPI';

export class ComdirectReportsService {
  /**
   * List of all balances for a client's own and connected products.
   * @param data The data for the request.
   * @param data.user The literal "user" or the UUID of the participant.
   * @param data.clientConnectionType A single ConnectionType of a client connection or a list of ConnectionTypes.
   * @param data.targetClientId A single UUID of a target client or a list of UUIDs.
   * @param data.withoutAttr Prevents setting the static data in the balance objects.
   * @param data.productType Filter for a single or list of product types.
   * @returns ListResourceProductBalance successful operation
   * @throws ApiError
   */
  public static reportsV1GetParticipantBalances(data: ReportsV1GetParticipantBalancesData): CancelablePromise<ReportsV1GetParticipantBalancesResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/reports/participants/{user}/v1/allbalances',
      path: {
        user: data.user
      },
      query: {
        clientConnectionType: data.clientConnectionType,
        targetClientId: data.targetClientId,
        'without-attr': data.withoutAttr,
        productType: data.productType
      },
      errors: {
        404: 'Not Found',
        422: 'Unprocessable Entity',
        501: 'Not Implemented'
      }
    });
  }
}
