export default class User {
  uid_;
  session;
  constructor(UID, _session) {
    this.uid_ = UID;
    this.session = _session;
  }
}