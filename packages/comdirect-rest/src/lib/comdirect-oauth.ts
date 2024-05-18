import * as readline from 'readline/promises';
import { OpenAPI } from './core/OpenAPI';
import { AuthenticationData, Session, SessionV1PatchSessionData, SessionV1PostSessionValidationData, SessionValidationResponse } from './types.gen';
import { ComdirectSessionService } from './comdirect-session-service';
import { ComdirectAuthService } from './comdirect-auth-service';


/**
 * You might want to do this in your own application.
 * It shows how the authentication works.
 */
export class ComdirectOauth {

  public accessToken = null;
  public sessionId = null;
  public requestId = null;

  constructor() {
    // session and request ids are random
    this.sessionId = this.guid();
    this.requestId = this.genRequestId();
    OpenAPI.HEADERS = {};
    OpenAPI.HEADERS["x-http-request-info"] = this.clientRequestId();
  }

  public sessionData() {
    return {
      user: <string>OpenAPI.CLIENT_ID,
      session: this.sessionId,
    };
  }

  public clientRequestId() {
    return '{"clientRequestId":{"sessionId":"' + this.sessionId + '","requestId":"' + this.requestId + '"}}';
  }

  public async performOAuth() {

    try {
      console.log('1. Get token');

      let authData = await this.getFirstAccessToken();

      this.accessToken = OpenAPI.TOKEN = authData.access_token;
      if (!this.accessToken) {
        throw new Error('No Access Token');
      }

      console.log('2. Get session with Access Token');

      let sessionRes = await ComdirectSessionService.sessionV1GetSession(this.sessionData());

      console.log('3. Validate session');

      const session: Session = {};
      session.identifier = sessionRes[0].identifier;
      session.sessionTanActive = true;
      session.activated2FA = true;

      const authInfo = await this.doTanChallenge(session);

      // wait for approvement from app
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      const answer = await rl.question('Access granted in app (2FA)?');
      rl.close();

      console.log('4. Activate session TAN');

      await this.activateSessionTan(session, authInfo);

      console.log('5. get final Access Token');

      const authDataFinal = await this.performSecondFlow();

      this.accessToken = OpenAPI.TOKEN = authDataFinal.access_token;
      if (!this.accessToken) {
        throw new Error('No Access Token (Second Flow)');
      }

      console.log('Authentication finished');

    } catch (error) {
      console.log('Some error', error);
    }
  }

  public async getFirstAccessToken(): Promise<AuthenticationData> {
    return ComdirectAuthService.oauthToken({formData: ComdirectAuthService.getAuthCredentials()});
  }

  public async doTanChallenge(session: Session): Promise<SessionValidationResponse> {
    const data = <SessionV1PostSessionValidationData>this.sessionData();
    data.body = session;

    return ComdirectSessionService.sessionV1PostSessionValidation(data);
  }

  public async activateSessionTan(session: Session, authInfo: SessionValidationResponse) {
    const data = <SessionV1PatchSessionData>this.sessionData();
    data.body = session;
    data.id = authInfo.id;

    return ComdirectSessionService.sessionV1PatchSession(data);
  }

  public async performSecondFlow() {
    return ComdirectAuthService.oauthToken({formData: ComdirectAuthService.getAuthCredentialsSecondaryFlow()});
  }

  protected guid() {
    function _p8(s = false) {
      const p = (Math.random().toString(16) + '000000000').substring(2, 8);
      return s ? '-' + p.substring(0, 4) + '-' + p.substring(4, 4) : p;
    }

    return _p8() + _p8(true) + _p8(true) + _p8();
  }

  protected genRequestId() {
    const now = Date.now().toString();
    return now.substring(now.length - 9, now.length);
  }
}
