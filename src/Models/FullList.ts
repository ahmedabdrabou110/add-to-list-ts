import ItemList from "./ListItem";

interface List {
  list: ItemList[];
  load(): void;
  save(): void;
  clearList(): void;
  addItem(itemObj: ItemList): void;
  removeItem(id: string): void;
}

export default class FullList implements List {
  static instance : FullList = new FullList();
  private constructor(private _list:ItemList[] = []) {}

  get list():ItemList[] {
    return this._list ;
  }

  load():void {
    const storedList:string | null = localStorage.getItem("myList");
    if(typeof storedList !== "string") return ;
    const parsedList:{_id:string , _item:string , _checked:boolean}[] = JSON.parse(storedList)
    parsedList.forEach(itemObj => {
      const newListItem = new ItemList(itemObj._id , itemObj._item , itemObj._checked);
      FullList.instance.addItem(newListItem); 
    })
  }

  save():void {
    localStorage.setItem("myList", JSON.stringify(this._list));
  }

  clearList(): void {
      this._list = [] ;
      this.save();
  }

  addItem(itemObj: ItemList): void {
      this._list.push(itemObj);
      this.save();
  }

  removeItem(id: string): void {
      this._list = this._list.filter(item => item.id !== id)
      this.save();
  }

}
