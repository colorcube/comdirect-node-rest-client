import {
  BankingV1GetAccountTransactionsData,
  BankingV1GetAccountTransactionsResponse,
  BankingV2GetAccountBalanceData,
  BankingV2GetAccountBalanceResponse,
  BankingV2GetAccountBalancesData,
  BankingV2GetAccountBalancesResponse
} from './types.gen';
import { CancelablePromise } from './core/CancelablePromise';
import { request as __request } from './core/request';
import { OpenAPI } from './core/OpenAPI';

export class ComdirectBankingService {
  /**
   * Request for account information, including cash balance and buying power, for all accounts
   * @param data The data for the request.
   * @param data.user Can be either the customer identification number (UUID) or 'user'
   * @param data.withoutAttr Suppresses the master data of the accounts
   * @returns ListResourceAccountBalance successful operation
   * @throws ApiError
   */
  public static bankingV2GetAccountBalances(data: BankingV2GetAccountBalancesData): CancelablePromise<BankingV2GetAccountBalancesResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/banking/clients/{user}/v2/accounts/balances', // ?paging-first=0&paging-count=1000
      path: {
        user: data.user
      },
      query: {
        'without-attr': data.withoutAttr
      },
      errors: {
        404: 'Not Found',
        422: 'Unprocessable Entity',
        500: 'Unexpected Error'
      }
    });
  }

  /**
   * Requests and returns a list of transactions for the given account
   * @param data The data for the request.
   * @param data.accountId Account identifier (UUID)
   * @param data.transactionState Filters for AccountTransactions. Will return all AccountTransactions (BOTH), or return all booked AccountTransactions (BOOKED), or all not booked AccountTransactions (NOTBOOKED).
   * @param data.transactionDirection Filters for CREDIT, DEBIT or CREDIT_AND_DEBIT
   * @param data.pagingFirst Index of the first transaction.
   * @param data.withAttr Enforce to load the master data of an attribute. Currently supported attributes: account
   * @returns ListResourceAccountTransaction successful operation
   * @throws ApiError
   */
  public static bankingV1GetAccountTransactions(data: BankingV1GetAccountTransactionsData): CancelablePromise<BankingV1GetAccountTransactionsResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/banking/v1/accounts/{accountId}/transactions',
      path: {
        accountId: data.accountId
      },
      query: {
        transactionState: data.transactionState,
        transactionDirection: data.transactionDirection,
        'paging-first': data.pagingFirst,
        'with-attr': data.withAttr
      },
      errors: {
        404: 'No transactions found',
        422: 'Error in request parameter',
        500: 'An internal Error occurred'
      }
    });
  }

  /**
   * Request for account information, including cash balance and buying power
   * @param data The data for the request.
   * @param data.accountId Account identifier (UUID)
   * @param data.withoutAttr Suppresses the master data of the account
   * @returns AccountBalance successful operation
   * @throws ApiError
   */
  public static bankingV2GetAccountBalance(data: BankingV2GetAccountBalanceData): CancelablePromise<BankingV2GetAccountBalanceResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/banking/v2/accounts/{accountId}/balances',
      path: {
        accountId: data.accountId
      },
      query: {
        'without-attr': data.withoutAttr
      },
      errors: {
        404: 'Not Found',
        422: 'Unprocessable Entity',
        500: 'Unexpected Error'
      }
    });
  }

}
