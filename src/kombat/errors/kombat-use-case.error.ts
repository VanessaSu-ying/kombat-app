export default class KombatUseCaseError implements Error {
  name: string;
  message: string;
  stack?: string;
  constructor(name: string, externalMessage: string) {
    this.name = `KombatUseCaseError: ${name}`;
    this.message = externalMessage;
  }
}
