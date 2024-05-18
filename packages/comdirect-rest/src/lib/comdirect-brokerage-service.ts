import {
  BrokerageV1GetInstrumentData,
  BrokerageV1GetInstrumentResponse,
  BrokerageV3DeleteOrderData,
  BrokerageV3DeleteOrderResponse,
  BrokerageV3GetDepotPositionData,
  BrokerageV3GetDepotPositionResponse,
  BrokerageV3GetDepotPositionsData,
  BrokerageV3GetDepotPositionsResponse,
  BrokerageV3GetDepotsData,
  BrokerageV3GetDepotsResponse,
  BrokerageV3GetDepotTransactionsData,
  BrokerageV3GetDepotTransactionsResponse,
  BrokerageV3GetOrderCostIndicationExAnteData,
  BrokerageV3GetOrderCostIndicationExAnteResponse,
  BrokerageV3GetOrderData,
  BrokerageV3GetOrderDimensionsData,
  BrokerageV3GetOrderDimensionsResponse,
  BrokerageV3GetOrderResponse,
  BrokerageV3GetOrdersCostIndicationExAnteData,
  BrokerageV3GetOrdersCostIndicationExAnteResponse,
  BrokerageV3GetOrdersData,
  BrokerageV3GetOrdersResponse,
  BrokerageV3PatchOrderData,
  BrokerageV3PatchOrderResponse,
  BrokerageV3PatchQuoteTicketData,
  BrokerageV3PostOrderData,
  BrokerageV3PostOrderPrevalidationData,
  BrokerageV3PostOrderPrevalidationResponse,
  BrokerageV3PostOrderResponse,
  BrokerageV3PostOrdersPrevalidationData,
  BrokerageV3PostOrdersPrevalidationResponse,
  BrokerageV3PostOrdersValidationData,
  BrokerageV3PostOrdersValidationResponse,
  BrokerageV3PostOrderValidationData,
  BrokerageV3PostOrderValidationResponse,
  BrokerageV3PostQuoteRequestData,
  BrokerageV3PostQuoteRequestResponse,
  BrokerageV3PostQuoteTicketData,
  BrokerageV3PostQuoteTicketResponse
} from './types.gen';
import { CancelablePromise } from './core/CancelablePromise';
import { request as __request } from './core/request';
import { OpenAPI } from './core/OpenAPI';

export class ComdirectBrokerageService {
  /**
   * Request for a list of the master data for the securities accounts of the registered user
   * @param data The data for the request.
   * @param data.userId UUID of the user to search depots for, or the string 'user' to use the logged in user
   * @returns ListResourceDepot successful operation
   * @throws ApiError
   */
  public static brokerageV3GetDepots(data: BrokerageV3GetDepotsData): CancelablePromise<BrokerageV3GetDepotsResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/brokerage/clients/{userId}/v3/depots',
      path: {
        userId: data.userId
      },
      errors: {
        404: 'Not Found',
        422: 'Unprocessable Entity',
        500: 'Unexpected Error'
      }
    });
  }

  /**
   * Delivers a list of all orders for the given depotId.
   * @param data The data for the request.
   * @param data.depotId Reference to securities account number (as UUID).
   * @param data.withAttr enables attribute: instrument.
   * @param data.withoutAttr Disables attribute: executions.
   * @param data.instrumentId Instrument id (UUID), unique identification of an instrument (security, derivative, etc.).
   * @param data.isin ISIN
   * @param data.wkn WKN
   * @param data.orderStatus Status of the order.
   * @param data.venueId Venue id (UUID), unique identification of a venue.
   * @param data.orderType The order type.
   * @param data.minCreationTimeStamp Minimum value of order's creation timestamp in UTC with the following format: YYYY-MM-DDThh:mm:ss,ffffff+zz.
   * @param data.maxCreationTimeStamp Maximum value of order's creation timestamp in UTC with the following format: YYYY-MM-DDThh:mm:ss,ffffff+zz.
   * @param data.side Possible transaction types
   * @returns ListResourceOrder successful operation
   * @throws ApiError
   */
  public static brokerageV3GetOrders(data: BrokerageV3GetOrdersData): CancelablePromise<BrokerageV3GetOrdersResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/brokerage/depots/{depotId}/v3/orders',
      path: {
        depotId: data.depotId
      },
      query: {
        'with-attr': data.withAttr,
        'without-attr': data.withoutAttr,
        instrumentId: data.instrumentId,
        isin: data.isin,
        wkn: data.wkn,
        orderStatus: data.orderStatus,
        venueId: data.venueId,
        orderType: data.orderType,
        'min-creationTimeStamp': data.minCreationTimeStamp,
        'max-creationTimeStamp': data.maxCreationTimeStamp,
        side: data.side
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
   * Request for an instrument's information
   * @param data The data for the request.
   * @param data.instrumentId Instrument identification - can be either the WKN, the ISIN or the symbol of the instrument
   * @param data.withAttr Enables attribute: orderDimensions
   * @param data.withoutAttr Disables attribute: staticData
   * @returns ListResourceInstrument successful operation
   * @throws ApiError
   */
  public static brokerageV1GetInstrument(data: BrokerageV1GetInstrumentData): CancelablePromise<BrokerageV1GetInstrumentResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/brokerage/v1/instruments/{instrumentId}',
      path: {
        instrumentId: data.instrumentId
      },
      query: {
        'with-attr': data.withAttr,
        'without-attr': data.withoutAttr
      },
      errors: {
        404: 'Not Found',
        422: 'Unprocessable Entity',
        500: 'Internal Server Error'
      }
    });
  }

  /**
   * Request for securities positions, optionally including only the total balance with securities account information
   * @param data The data for the request.
   * @param data.depotId Reference to securities account number (as UUID).
   * @param data.instrumentId Instrument identification - can either be the WKN, the ISIN or the UUID of the instrument.
   * @param data.withoutAttr Disables attributes for this request. Allowed attributes: depot, positions
   * @param data.withAttr Enables additional attributes for this request. Allowed attributes: instrument
   * @returns ListResourceDepotPosition successful operation
   * @throws ApiError
   */
  public static brokerageV3GetDepotPositions(data: BrokerageV3GetDepotPositionsData): CancelablePromise<BrokerageV3GetDepotPositionsResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/brokerage/v3/depots/{depotId}/positions',
      path: {
        depotId: data.depotId
      },
      query: {
        instrumentId: data.instrumentId,
        'without-attr': data.withoutAttr,
        'with-attr': data.withAttr
      },
      errors: {
        404: 'Not Found',
        422: 'Unprocessable Entity',
        500: 'Unexpected Error',
        503: 'Service Unavailable'
      }
    });
  }

  /**
   * Request for retrieving a single position of specific depot.
   * @param data The data for the request.
   * @param data.depotId Reference to securities account number (as UUID).
   * @param data.positionId Position identification number in securities account (as UUID)
   * @param data.withAttr Enables additional attributes for this request. Allowed attributes: instrument
   * @returns DepotPosition successful operation
   * @throws ApiError
   */
  public static brokerageV3GetDepotPosition(data: BrokerageV3GetDepotPositionData): CancelablePromise<BrokerageV3GetDepotPositionResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/brokerage/v3/depots/{depotId}/positions/{positionId}',
      path: {
        depotId: data.depotId,
        positionId: data.positionId
      },
      query: {
        'with-attr': data.withAttr
      },
      errors: {
        404: 'Not Found',
        422: 'Unprocessable Entity',
        500: 'Unexpected Error',
        503: 'Service Unavailable'
      }
    });
  }

  /**
   * Depot transactions.
   * @param data The data for the request.
   * @param data.depotId Reference to securities account number (as UUID).
   * @param data.isin ISIN
   * @param data.wkn WKN
   * @param data.instrumentId Instrument id (UUID), unique identification of an instrument.
   * @param data.minBookingDate Earliest booking date of the transaction. Format: YYYY-MM-DD or as negative offset from the current date e.g. -10d
   * @returns ListResourceDepotTransaction successful operation
   * @throws ApiError
   */
  public static brokerageV3GetDepotTransactions(data: BrokerageV3GetDepotTransactionsData): CancelablePromise<BrokerageV3GetDepotTransactionsResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/brokerage/v3/depots/{depotId}/transactions',
      path: {
        depotId: data.depotId
      },
      query: {
        isin: data.isin,
        wkn: data.wkn,
        instrumentId: data.instrumentId,
        'min-bookingDate': data.minBookingDate
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
   * Order entry.
   * @param data The data for the request.
   * @param data.body
   * @returns Order successful operation
   * @throws ApiError
   */
  public static brokerageV3PostOrder(data: BrokerageV3PostOrderData = {}): CancelablePromise<BrokerageV3PostOrderResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/brokerage/v3/orders',
      body: data.body,
      errors: {
        422: 'Unprocessable Entity',
        500: 'Internal Server Error',
        503: 'Service Unavailable'
      }
    });
  }

  /**
   * Generation of the ex-ante cost indication on the basis of the order data.
   * @param data The data for the request.
   * @param data.order The Order for which the cost indication is to be calculated
   * @returns ListResourceCostIndicationExAnte successful operation
   * @throws ApiError
   */
  public static brokerageV3GetOrdersCostIndicationExAnte(data: BrokerageV3GetOrdersCostIndicationExAnteData): CancelablePromise<BrokerageV3GetOrdersCostIndicationExAnteResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/brokerage/v3/orders/costindicationexante',
      body: data.order,
      errors: {
        422: 'Unprocessable Entity',
        500: 'Internal Server Error'
      }
    });
  }

  /**
   * Request for the trading venue and order options for a particular instrument
   * @param data The data for the request.
   * @param data.instrumentId Instrument id (UUID), unique identification of an instrument (security, derivative, etc.).
   * @param data.isin ISIN
   * @param data.wkn WKN
   * @param data.custodyType The custody type.
   * @param data.venueId Venue id (UUID), unique identification of a venue.
   * @param data.orderType The order type.
   * @param data.side Possible transaction types.
   * @param data.country Country of venue in ISO 3166-2.
   * @param data.type Type of venue.
   * @returns ListResourceDimensions successful operation
   * @throws ApiError
   */
  public static brokerageV3GetOrderDimensions(data: BrokerageV3GetOrderDimensionsData = {}): CancelablePromise<BrokerageV3GetOrderDimensionsResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/brokerage/v3/orders/dimensions',
      query: {
        instrumentId: data.instrumentId,
        isin: data.isin,
        wkn: data.wkn,
        custodyType: data.custodyType,
        venueId: data.venueId,
        orderType: data.orderType,
        side: data.side,
        country: data.country,
        type: data.type
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
   * Prevalidation of the order
   * @param data The data for the request.
   * @param data.body
   * @returns Order successful operation
   * @throws ApiError
   */
  public static brokerageV3PostOrdersPrevalidation(data: BrokerageV3PostOrdersPrevalidationData = {}): CancelablePromise<BrokerageV3PostOrdersPrevalidationResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/brokerage/v3/orders/prevalidation',
      body: data.body,
      errors: {
        422: 'Unprocessable Entity',
        500: 'Internal Server Error',
        503: 'Service Unavailable'
      }
    });
  }

  /**
   * Validation of an order entry and triggering of a TAN-Challenge in a non-usage case of a Session-TAN.
   * @param data The data for the request.
   * @param data.body
   * @returns Order successful operation
   * @throws ApiError
   */
  public static brokerageV3PostOrdersValidation(data: BrokerageV3PostOrdersValidationData = {}): CancelablePromise<BrokerageV3PostOrdersValidationResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/brokerage/v3/orders/validation',
      body: data.body,
      errors: {
        422: 'Unprocessable Entity',
        500: 'Internal Server Error',
        503: 'Service Unavailable'
      }
    });
  }

  /**
   * Delivers an order for the given orderId.
   * @param data The data for the request.
   * @param data.orderId Unique orderId (UUID).
   * @param data.withoutAttr Disables attribute: executions.
   * @returns Order successful operation
   * @throws ApiError
   */
  public static brokerageV3GetOrder(data: BrokerageV3GetOrderData): CancelablePromise<BrokerageV3GetOrderResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/brokerage/v3/orders/{orderId}',
      path: {
        orderId: data.orderId
      },
      query: {
        'without-attr': data.withoutAttr
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
   * Order cancellation.
   * @param data The data for the request.
   * @param data.orderId Reference to order identifier (as UUID).
   * @returns Order successful operation
   * @throws ApiError
   */
  public static brokerageV3DeleteOrder(data: BrokerageV3DeleteOrderData): CancelablePromise<BrokerageV3DeleteOrderResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/brokerage/v3/orders/{orderId}',
      path: {
        orderId: data.orderId
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
   * Order modification.
   * @param data The data for the request.
   * @param data.orderId Reference to order identifier (as UUID).
   * @param data.body
   * @returns Order successful operation
   * @throws ApiError
   */
  public static brokerageV3PatchOrder(data: BrokerageV3PatchOrderData): CancelablePromise<BrokerageV3PatchOrderResponse> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/brokerage/v3/orders/{orderId}',
      path: {
        orderId: data.orderId
      },
      body: data.body,
      errors: {
        404: 'Not Found',
        422: 'Unprocessable Entity',
        500: 'Internal Server Error',
        503: 'Service Unavailable'
      }
    });
  }

  /**
   * Generation of the ex-ante cost indication on the basis of the order data.
   * @param data The data for the request.
   * @param data.orderId Reference to order identifier (as UUID).
   * @param data.order The Order for which the cost indication is to be calculated
   * @returns ListResourceCostIndicationExAnte successful operation
   * @throws ApiError
   */
  public static brokerageV3GetOrderCostIndicationExAnte(data: BrokerageV3GetOrderCostIndicationExAnteData): CancelablePromise<BrokerageV3GetOrderCostIndicationExAnteResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/brokerage/v3/orders/{orderId}/costindicationexante',
      path: {
        orderId: data.orderId
      },
      body: data.order,
      errors: {
        404: 'Not Found',
        422: 'Unprocessable Entity',
        500: 'Internal Server Error'
      }
    });
  }

  /**
   * Prevalidation of an order modfication
   * @param data The data for the request.
   * @param data.orderId Reference to order identifier (as UUID).
   * @param data.body
   * @returns Order successful operation
   * @throws ApiError
   */
  public static brokerageV3PostOrderPrevalidation(data: BrokerageV3PostOrderPrevalidationData): CancelablePromise<BrokerageV3PostOrderPrevalidationResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/brokerage/v3/orders/{orderId}/prevalidation',
      path: {
        orderId: data.orderId
      },
      body: data.body,
      errors: {
        404: 'Not Found',
        422: 'Unprocessable Entity',
        500: 'Internal Server Error',
        503: 'Service Unavailable'
      }
    });
  }

  /**
   * Validation of an order modification or order cancellation and triggering of a TAN Challenge in a non-usage case of a Session-TAN.
   * @param data The data for the request.
   * @param data.orderId Reference to order identifier (as UUID).
   * @param data.body
   * @returns Order successful operation
   * @throws ApiError
   */
  public static brokerageV3PostOrderValidation(data: BrokerageV3PostOrderValidationData): CancelablePromise<BrokerageV3PostOrderValidationResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/brokerage/v3/orders/{orderId}/validation',
      path: {
        orderId: data.orderId
      },
      body: data.body,
      errors: {
        404: 'Not Found',
        422: 'Unprocessable Entity',
        500: 'Internal Server Error',
        503: 'Service Unavailable'
      }
    });
  }

  /**
   * Sends a quote request to a venue
   * @param data The data for the request.
   * @param data.body
   * @returns Quote successful operation
   * @throws ApiError
   */
  public static brokerageV3PostQuoteRequest(data: BrokerageV3PostQuoteRequestData = {}): CancelablePromise<BrokerageV3PostQuoteRequestResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/brokerage/v3/quotes',
      body: data.body,
      errors: {
        404: 'Not Found',
        422: 'Unprocessable Entity',
        500: 'Internal Server Error'
      }
    });
  }

  /**
   * Initiates a TAN-Challenge
   * @param data The data for the request.
   * @param data.order The order for which a ticket will be acquired
   * @returns Order successful operation
   * @throws ApiError
   */
  public static brokerageV3PostQuoteTicket(data: BrokerageV3PostQuoteTicketData): CancelablePromise<BrokerageV3PostQuoteTicketResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/brokerage/v3/quoteticket',
      body: data.order,
      errors: {
        404: 'Not Found',
        422: 'Unprocessable Entity',
        500: 'Internal Server Error'
      }
    });
  }

  /**
   * Initiate a TAN-Challange
   * @param data The data for the request.
   * @param data.ticketId Reference to the quote ticket (as UUID).
   * @throws ApiError
   */
  public static brokerageV3PatchQuoteTicket(data: BrokerageV3PatchQuoteTicketData): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/brokerage/v3/quoteticket/{ticketId}',
      path: {
        ticketId: data.ticketId
      },
      errors: {
        404: 'Not Found',
        422: 'Unprocessable Entity',
        500: 'Internal Server Error'
      }
    });
  }

}
