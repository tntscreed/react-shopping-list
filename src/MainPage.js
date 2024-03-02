import ItemGrid from "./ItemGrid";
import { useEffect, useState } from "react";
import {
  useQuery,
  useQueryClient,
  useMutation,
  QueryClient,
} from "@tanstack/react-query";
import { fetchItems } from "./api/items";
import { addItem } from "./api/items";
import API_URL from "./api_config";

const MainPage = () => {
  console.log(API_URL);

  const queryClient = useQueryClient();

  const testAdd = async (item) => {
    addItem(API_URL, {
      name: "Test Item",
      quantity: 1,
      active: true,
    });
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

  return (
    <div className="justify-center text-center">
      <h1 className="bold text-4xl" style={{ paddingBottom: "50px" }}>
        Items
      </h1>
      {isError && <p>Error fetching items</p>}
      {isLoading && <p>Loading...</p>}
      {items && items.length === 0 && <p>No items found</p>}
      {items && (
        <button className="btn btn-primary btn-outline" onClick={testAdd}>
          Add Item
        </button>
      )}
      {items && (
        <button onClick={refreshData} className="btn btn-secondary btn-outline">
          Refresh
        </button>
      )}
      {items && <ItemGrid columns={columns} items={items} />}
    </div>
  );
};

export default MainPage;
