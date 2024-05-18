import { ComdirectBankingService, ComdirectOauth } from '@colorcube/comdirect-rest';


async function main() {

  let comdirectOauth = new ComdirectOauth();
  await comdirectOauth.performOAuth();

  console.log("\n");

  // let ses2 = await ComdirectSessionService.sessionV1GetSession(comdirectOauth.sessionData());
  // console.log('sessionData', JSON.stringify(ses2, null, 2));

  let res = await ComdirectBankingService.bankingV2GetAccountBalances({ user: 'user' });
  console.log('bankingV2GetAccountBalances', JSON.stringify(res, null, 2));

  let res2 = await ComdirectBankingService.bankingV1GetAccountTransactions({ accountId: res.values[0].account.accountId });
  console.log('bankingV1GetAccountTransactions', JSON.stringify(res2, null, 2));
}

main();
