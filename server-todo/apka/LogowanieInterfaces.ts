export interface loginAttemptIE {
  login: string;
  password: string;
}
export interface registerAccountConfirmIE {
  email: string;
  code: string;
}
export interface registerConfirmSetexIE {
  code: string;
  login: string;
  password: string;
}
