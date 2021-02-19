export default class Book {
  title;
  genre;
  audience;
  constructor(_title: string, _genre: string, _audience: string) {
    this.title = _title;
    this.genre = _genre;
    this.audience = _audience;
  }
}