import React, { Fragment, useContext, useEffect, useState } from "react";
import { getAllProduct, deleteProduct } from "./FetchApi";
import moment from "moment";
import { ProductContext } from "./index";

const COLUMN_CONFIG = [
  { key: "name", label: "Product" },
  { key: "description", label: "Description" },
  { key: "imageUrl", label: "Image" },
  { key: "status", label: "Status" },
  { key: "inventoryQuantity", label: "Stock" },
  { key: "categoryName", label: "Category" },
  { key: "warrantyPeriod", label: "Warranty" },
  { key: "createdAt", label: "Created at" },
  { key: "updatedAt", label: "Updated at" },
];

const AllProduct = (props) => {
  const { data, dispatch } = useContext(ProductContext);
  const { products } = data;

  const [loading, setLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    setLoading(true);
    let responseData = await getAllProduct();
    setTimeout(() => {
      if (responseData && responseData.Products) {
        dispatch({
          type: "fetchProductsAndChangeState",
          payload: responseData.Products,
        });
        setLoading(false);
      }
    }, 1000);
  };

  const deleteProductReq = async (pId) => {
    let deleteC = await deleteProduct(pId);
    if (deleteC.error) {
      console.log(deleteC.error);
    } else if (deleteC.success) {
      console.log(deleteC.success);
      fetchData();
    }
  };

  const editProduct = (pId, product, type) => {
    if (type) {
      dispatch({
        type: "editProductModalOpen",
        product: { ...product, pId: pId },
      });
    }
  };

  // Sorting logic
  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        if (prev.direction === "asc") return { key, direction: "desc" };
        if (prev.direction === "desc") return { key: null, direction: null };
        return { key, direction: "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  let filteredProducts = products || [];
  if (search.trim()) {
    const s = search.trim().toLowerCase();
    filteredProducts = filteredProducts.filter((p) =>
      [p.name, p.description, p.categoryName, p.status]
        .filter(Boolean)
        .some((v) => v.toLowerCase().includes(s))
    );
  }

  if (sortConfig.key && sortConfig.direction) {
    filteredProducts = [...filteredProducts].sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];
      if (sortConfig.key === "createdAt" || sortConfig.key === "updatedAt") {
        aVal = aVal ? new Date(aVal) : 0;
        bVal = bVal ? new Date(bVal) : 0;
      }
      if (aVal === undefined || aVal === null) return 1;
      if (bVal === undefined || bVal === null) return -1;
      if (typeof aVal === "string" && typeof bVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <svg
          className="w-12 h-12 animate-spin text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <Fragment>
      <div className="col-span-1 overflow-auto bg-white shadow-lg p-4">
        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            className="border rounded px-3 py-2 w-full md:w-1/3"
            placeholder="Search by name, description, category, status..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <table className="table-auto border w-full my-2">
          <thead>
            <tr>
              {COLUMN_CONFIG.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-2 border cursor-pointer select-none"
                  onClick={() => handleSort(col.key)}
                >
                  {col.label}
                  {sortConfig.key === col.key ? (
                    sortConfig.direction === "asc" ? " ▲" : sortConfig.direction === "desc" ? " ▼" : ""
                  ) : ""}
                </th>
              ))}
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts && filteredProducts.length > 0 ? (
              filteredProducts.map((item, key) => {
                return (
                  <ProductTable
                    product={item}
                    editProduct={(pId, product, type) =>
                      editProduct(pId, product, type)
                    }
                    deleteProduct={(pId) => deleteProductReq(pId)}
                    key={key}
                  />
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={COLUMN_CONFIG.length + 1}
                  className="text-xl text-center font-semibold py-8"
                >
                  No product found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="text-sm text-gray-600 mt-2">
          Total {filteredProducts && filteredProducts.length} product found
        </div>
      </div>
    </Fragment>
  );
};

/* Single Product Component */
const ProductTable = ({ product, deleteProduct, editProduct }) => {
  return (
    <Fragment>
      <tr>
        <td className="p-2 text-left">
          {product.name && product.name.length > 15
            ? product.name.substring(0, 15) + "..."
            : product.name}
        </td>
        <td className="p-2 text-left">
          {product.description ? product.description.slice(0, 15) + "..." : ""}
        </td>
        <td className="p-2 text-center">
          <img
            className="w-12 h-12 object-cover object-center"
            src={product.imageUrl}
            alt="pic"
          />
        </td>
        <td className="p-2 text-center">
          <span
            className={`rounded-full text-center text-xs px-2 font-semibold ${
              product.status === "Active" ? "bg-green-200" : "bg-red-200"
            }`}
          >
            {product.status || "Active"}
          </span>
        </td>
        <td className="p-2 text-center">{product.inventoryQuantity}</td>
        <td className="p-2 text-center">{product.categoryName}</td>
        <td className="p-2 text-center">{product.warrantyPeriod}</td>
        <td className="p-2 text-center">
          {product.createdAt ? moment(product.createdAt).format("lll") : ""}
        </td>
        <td className="p-2 text-center">
          {product.updatedAt ? moment(product.updatedAt).format("lll") : ""}
        </td>
        <td className="p-2 flex items-center justify-center">
          <span
            onClick={(e) => editProduct(product.id, product, true)}
            className="cursor-pointer hover:bg-gray-200 rounded-lg p-2 mx-1"
          >
            <svg
              className="w-6 h-6 fill-current text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path
                fillRule="evenodd"
                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span
            onClick={(e) => deleteProduct(product.id)}
            className="cursor-pointer hover:bg-gray-200 rounded-lg p-2 mx-1"
          >
            <svg
              className="w-6 h-6 fill-current text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </td>
      </tr>
    </Fragment>
  );
};

export default AllProduct;
