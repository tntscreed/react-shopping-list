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

  const testFunction = () => {
    console.log("Test Function");
  };

  const queryClient = useQueryClient();

  const { mutateAsync: addItemMutation } = useMutation({
    mutationFn: addItem,
    onSuccess: () => {
      queryClient.invalidateQueries("items");
    },
  });

  const { mutateAsync: editItemMutation } = useMutation({
    mutationFn: editItem,
    onSuccess: () => {
      queryClient.invalidateQueries("items");
    },
  });

  const [toBeEdited, setToBeEdited] = useState(null);

  const openEditDialog = ([id, name, quantity, active]) => {
    console.log("Opening edit dialog:\n id: " + id + "\n name: " + name);

    setToBeEdited(id);
    document
      .getElementById("editItemForm")
      .querySelector(".item-form")
      .showModal();
    let parent = document
      .getElementById("editItemForm")
      .querySelector(".item-form");
    parent.querySelector("#nameInput").value = name;
    parent.querySelector("#qtyInput").value = quantity;
    parent.querySelector("#checkboxInput").checked = active;
  };

  const testAdd = async (item) => {
    // Only for testing
    await addItemMutation([
      API_URL,
      {
        name: "Test Item",
        quantity: 1,
        active: true,
      },
    ]);
  };

  const refreshData = () => {
    queryClient.invalidateQueries("items");
  };

  const columns = ["ID", "Name", "Qty", "Active", "Actions"];

  const [items, setItems] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["items"],
    queryFn: () => fetchItems(API_URL),
  });

  useEffect(() => {
    if (data) {
      setItems(data);
    }
  }, [data]);

  useEffect(() => {
    if (toBeEdited) {
      console.log("toBeEdited switched to this: " + toBeEdited);
    }
  }, [toBeEdited]);

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
