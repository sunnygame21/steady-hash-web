export enum ServerErrorStatus {
  InvalidParams = "Invalid Params",
  InvalidAuthorization = "Invalid Authorization",
  ServerError = "Server Error",
  InvalidUserToken = "Invalid User Token",
  NotWhitelist = 'Not eligible to mint',
  ExceededMintNumber = 'Exceeded the maximum number',
  AlreadyClaimed = 'Already Claimed',
  NotUnlocked = 'To Be Unlocked',
  TooFrequent = "Request is too frequent, please try again after 30 seconds."
}
