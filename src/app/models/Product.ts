export interface IProduct {
  id: number;
  Name: string;
  Description: string;
  Price: number;
  CreationDate: Date;
}

export class Product implements IProduct{
  public id: number = 0;
  public Name: string = "";
  public Description: string = "";
  public Price: number = 0;
  public CreationDate: Date = new Date();
}
