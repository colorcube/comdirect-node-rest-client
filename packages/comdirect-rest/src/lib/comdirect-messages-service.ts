import { MessagesV2GetDocumentData, MessagesV2GetDocumentsData, MessagesV2GetDocumentsResponse, MessagesV2GetPredocumentData } from './types.gen';
import { CancelablePromise } from './core/CancelablePromise';
import { request as __request } from './core/request';
import { OpenAPI } from './core/OpenAPI';

export class ComdirectMessagesService {
  /**
   * Delivers a list of documents for the customer.
   * @param data The data for the request.
   * @param data.user The literal "user" or the unique ID of the client.
   * @param data.pagingFirst Index of the returning results.
   * @param data.pagingCount The maximum number of results that will be returned.
   * @returns ListResourceDocument successful operation
   * @throws ApiError
   */
  public static messagesV2GetDocuments(data: MessagesV2GetDocumentsData): CancelablePromise<MessagesV2GetDocumentsResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/messages/clients/{user}/v2/documents',
      path: {
        user: data.user
      },
      query: {
        'paging-first': data.pagingFirst,
        'paging-count': data.pagingCount
      },
      errors: {
        404: 'Not Found',
        422: 'Unprocessable Entity',
        500: 'Internal Server Error'
      }
    });
  }

  /**
   * Delivers a document for the given UUID.
   * @param data The data for the request.
   * @param data.documentId The unique ID of the document.
   * @throws ApiError
   */
  public static messagesV2GetDocument(data: MessagesV2GetDocumentData): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/messages/v2/documents/{documentId}',
      path: {
        documentId: data.documentId
      },
      errors: {
        404: 'Not Found',
        422: 'Unprocessable Entity',
        500: 'Internal Server Error',
        503: 'Service Unavailable'
      }
    });
  }

  /**
   * Delivers a predocument for the given UUID.
   * @param data The data for the request.
   * @param data.documentId The unique ID of the document.
   * @throws ApiError
   */
  public static messagesV2GetPredocument(data: MessagesV2GetPredocumentData): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/messages/v2/documents/{documentId}/predocument',
      path: {
        documentId: data.documentId
      },
      errors: {
        404: 'Not Found',
        422: 'Unprocessable Entity',
        500: 'Internal Server Error',
        503: 'Service Unavailable'
      }
    });
  }

}
