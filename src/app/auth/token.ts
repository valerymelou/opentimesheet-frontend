export class Token {
  public access?: string;
  public refresh?: string;

  fromData(data: any): Token {
    this.access =  data.access;
    this.refresh = data.refresh;

    return this;
  }
}
