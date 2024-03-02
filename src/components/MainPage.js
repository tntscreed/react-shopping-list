import ItemGrid from "./ItemGrid";
import { useEffect, useState } from "react";
import {
  useQuery,
  useQueryClient,
  useMutation,
  QueryClient,
} from "@tanstack/react-query";
import { fetchItems } from "../api/items";
import { addItem, editItem } from "../api/items";
import API_URL from "../api_config";
import ItemForm from "./ItemForm";

const MainPage = () => {
  document.title = "Shopping List App";

  const queryClient = useQueryClient();

  // Used to refresh the data after adding an item
  const { mutateAsync: addItemMutation } = useMutation({
    mutationFn: addItem,
    onSuccess: () => {
      queryClient.invalidateQueries("items");
    },
  });

  // Used to refresh the data after editing an item
  const { mutateAsync: editItemMutation } = useMutation({
    mutationFn: editItem,
    onSuccess: () => {
      queryClient.invalidateQueries("items");
    },
  });

  // This is called by the edit button when clicked
  // It tells the form which item to edit
  const [toBeEdited, setToBeEdited] = useState(null);

  // The edit dialog is told by the click event which item to edit,
  // and what its current values are
  const openEditDialog = ([id, name, quantity, active]) => {
    setToBeEdited(id);
    let parent = document
      .getElementById("editItemForm")
      .querySelector(".item-form");
    parent.showModal();
    parent.querySelector("#nameInput").value = name;
    parent.querySelector("#qtyInput").value = quantity;
    parent.querySelector("#checkboxInput").checked = active;
  };

  // Used by the Refresh button
  const refreshData = () => {
    queryClient.invalidateQueries("items");
  };

  // The columns of the table that show up on the page
  const columns = ["ID", "Name", "Qty", "Active", "Actions"];

  // The items that are fetched from the server
  const [items, setItems] = useState(null);

  // isLoading and isError are used to show a loading message or an error message
  // instead of the table
  const { data, isLoading, isError } = useQuery({
    queryKey: ["items"],
    queryFn: () => fetchItems(API_URL),
  });

  useEffect(() => {
    if (data) {
      setItems(data);
    }
  }, [data]);

  // This is called when the edit form is submitted
  // It is a wrapper around the editItemMutation function
  const callEditItem = ([url, { name, quantity, active }]) => {
    try {
      editItemMutation([url, { name, quantity, active }, toBeEdited]);
    } catch (e) {
      console.log(e);
      // popup
      alert("Error editing item");
    }
    document.getElementById("editItemForm").querySelector(".item-form").close();
  };

  // Used to let the form know which ID they have in the DOM.
  let editFormId = "editItemForm";
  let addFormId = "addItemForm";

  return (
    <div className="h-screen justify-center text-center bg-gradient-to-br from-black to-gray-700">
      <h1 className="bold text-4xl" style={{ paddingBottom: "50px" }}>
        Items
      </h1>
      {isError && <p>Error fetching items</p>}
      {isLoading && <p>Loading...</p>}
      {items && items.length === 0 && <p>No items found</p>}
      <div className="flex justify-center text-center space-x-4">
        {items && (
          <button
            className="btn btn-primary btn-outline"
            onClick={() => {
              document
                .getElementById("addItemForm")
                .querySelector(".item-form")
                .showModal();
            }}
          >
            Add Item
          </button>
        )}
        {items && (
          <button
            onClick={refreshData}
            className="btn btn-secondary btn-outline"
          >
            Refresh
          </button>
        )}
      </div>

      <div className="flex">
        {items && (
          <ItemGrid editIdFn={openEditDialog} columns={columns} items={items} />
        )}
      </div>
      <div id={addFormId}>
        <ItemForm
          title={"Add Item"}
          btnName="Add"
          submitFn={addItemMutation}
          formDivId={addFormId}
        />
      </div>
      <div id={editFormId}>
        <ItemForm
          title={"Edit Item"}
          btnName="Edit"
          submitFn={callEditItem}
          formDivId={editFormId}
        />
      </div>
    </div>
  );
};

export default MainPage;
