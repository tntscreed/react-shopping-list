import { useState, useMutation } from "react";
import { removeItem } from "./api/items";
import { QueryClient } from "@tanstack/react-query";
import API_URL from "./api_config";

const ItemGrid = ({ columns, items }) => {
  let queryClient = new QueryClient();
  const deleteItem = (id) => {
    removeItem(API_URL, id);
  };

  return (
    <table className="table table-zebra">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.id}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
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
            <td>
              <button className="btn btn-primary btn-outline">Edit</button>
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
