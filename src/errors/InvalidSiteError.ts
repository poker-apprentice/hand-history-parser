export class InvalidSiteError extends Error {
  constructor(handHeader: string) {
    super(`Error parsing site for hand history beginning: "${handHeader}"`);
  }
}
