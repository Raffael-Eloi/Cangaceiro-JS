class ApplicationException extends Error {
  constructor(msg = "") {
    super(msg);

    // Ajusta o name do error
    this.name = this.constructor.name;
  }
}