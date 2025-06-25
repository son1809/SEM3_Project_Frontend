export const productState = {
  products: null,
  addProductModal: false,
  editProductModal: {
    modal: false,
    pId: "",
    pName: "",
    pDescription: "",
    pImage: "", // imageUrl as string
    pStatus: "",
    pCategory: "",
    pQuantity: "",
    pPrice: "",
    pWarrantyPeriod: "",
    pOffer: "",
  },
};

export const productReducer = (state, action) => {
  switch (action.type) {
    /* Get all product */
    case "fetchProductsAndChangeState":
      return {
        ...state,
        products: action.payload,
      };
    /* Create a product */
    case "addProductModal":
      return {
        ...state,
        addProductModal: action.payload,
      };
    /* Edit a product */
    case "editProductModalOpen":
      return {
        ...state,
        editProductModal: {
          modal: true,
          pId: action.product.id || action.product.pId,
          pName: action.product.name || action.product.pName,
          pDescription: action.product.description || action.product.pDescription,
          pImage: action.product.imageUrl || action.product.pImage,
          pStatus: action.product.pStatus || "Active",
          pCategory: action.product.categoryId || action.product.pCategory,
          pQuantity: action.product.inventoryQuantity || action.product.pQuantity,
          pPrice: action.product.price || action.product.pPrice,
          pWarrantyPeriod: action.product.warrantyPeriod || action.product.pWarrantyPeriod,
          pOffer: action.product.pOffer || "",
        },
      };
    case "editProductModalClose":
      return {
        ...state,
        editProductModal: {
          modal: false,
          pId: "",
          pName: "",
          pDescription: "",
          pImage: "",
          pStatus: "",
          pCategory: "",
          pQuantity: "",
          pPrice: "",
          pWarrantyPeriod: "",
          pOffer: "",
        },
      };
    default:
      return state;
  }
};
