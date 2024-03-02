import { useState } from "react";
import { removeItem } from "../api/items";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import API_URL from "../api_config";
import ItemForm from "./ItemForm";

const ItemGrid = ({ editIdFn, columns, items }) => {
  let queryClient = useQueryClient();

  const { mutateAsync: removeItemMutation } = useMutation({
    mutationFn: removeItem,
    onSuccess: () => {
      queryClient.invalidateQueries("items");
    },
  });

  const deleteItem = async (id) => {
    await removeItemMutation([API_URL, id]);
  };

  return (
    <table className="flex-1 table table-zebra">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={"header_" + column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={"row_" + item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            <td>
              <input
                type="checkbox"
                checked={item.active}
                onChange={() => {
                  // Add checkbox logic here
                }}
              />
            </td>
            <td className="flex space-x-4">
              <button
                onClick={() => {
                  editIdFn([item.id, item.name, item.quantity, item.active]);
                }}
                className="btn btn-primary btn-outline"
              >
                Edit
              </button>
              <button
                className="btn btn-warning btn-outline"
                onClick={() => deleteItem(item.id)}
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ItemGrid;
