import "./css/style.css";
import FullList from "./Models/FullList";
import ListTemplate from "./templates/ListTemplate";
import ItemList from "./Models/ListItem";

const initApp = (): void => {
  const fullList = FullList.instance;
  const template = ListTemplate.instance;

  //! Add Listener to new Entry Form List
  const itemEntryForm = document.getElementById(
    "itemEntryForm"
  ) as HTMLFormElement;
  itemEntryForm.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();
    //! Get the new item value
    const input = document.getElementById(
      "newItem"
    ) as HTMLInputElement as HTMLInputElement;
    const newEntryText: string = input.value.trim();
    if (!newEntryText) return;

    //! Calculate Item ID
    const itemId: number = fullList.list.length
      ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
      : 1;

    //! create new item
    const newItem = new ItemList(itemId.toString(), newEntryText);

    //! Add new Item to Full List
    fullList.addItem(newItem);

    //! Re-render list with new item included
    template.render(fullList);

    //! cleat input value
    input.value = "";
  });

  //! Add Listener to clear button
  const clearItems = document.getElementById(
    "clearItemsButton"
  ) as HTMLButtonElement;

  clearItems.addEventListener("click", () => {
    fullList.clearList();
    template.clear();
  });

  //! Load initial data
  fullList.load();

  //! initial render of template
  template.render(fullList);
};

document.addEventListener("DOMContentLoaded", initApp);
