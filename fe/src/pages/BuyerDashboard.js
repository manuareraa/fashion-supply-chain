import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";

function BuyerDashboard(props) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const processProducts = async () => {
    console.log("Processing Products in SellerDashboard");
    let tempArr = [];
    props.appState.products.forEach((product) => {
      const imageArray = product.image.split(",").map(Number);
      const imageUrl = URL.createObjectURL(
        new Blob([new Uint8Array(imageArray)])
      );
      let element = (
        <div className="flex flex-col rounded-lg items-center bg-custom-primary/50 w-56">
          <img
            className="rounded-t-lg w-56 h-64 object-fit"
            src={imageUrl}
            alt="Shirt"
          />
          <div className="flex flex-col p-4 space-y-2 items-center">
            <p className="text-md">{product.name}</p>
            <p className="text-md">
              <b>Price: &nbsp;</b>
              {product.price} &nbsp;MATIC
            </p>
            <button
              className="btn btn-custom"
              onClick={() => {
                props.buyProduct(
                  product.seller,
                  product.price.toString(),
                  product.productId,
                  product.name
                );
              }}
            >
              Buy
            </button>
          </div>
          <div className="flex flex-row justify-between w-full p-4 items-center">
            <div className="flex flex-col">
              <p className="font-bold">Seller</p>
              <p className="font-medium text-sm ">
                {product.seller.slice(0, 6) + "..." + product.seller.slice(-4)}
              </p>
            </div>
            <QRCode
              value={
                "http://localhost:3000/supply-chain/" +
                product.name.toLowerCase().replace(/\s+/g, "-")
              }
              size={40}
              bgColor="#7FCBD0"
            />
          </div>
          <p className="w-full text-center mb-4 text-xs underline">
            Product Details
          </p>
          <div className="w-full text-xs pb-4 px-4 text-center font-medium">
            {product.description}
          </div>
        </div>
      );
      tempArr.push(element);
      setProducts(tempArr);
    });
  };

  useEffect(() => {
    processProducts();
  }, [props.appState.products]);
  return (
    <>
      <div className="flex flex-row justify-between p-8 items-center">
        <p className="text-2xl font-bold">Store</p>
        <div className="flex flex-row space-x-4">
          <button
            className="btn"
            onClick={() => {
              navigate("/buyer-history");
            }}
          >
            Purchase History
          </button>
          <button
            className="btn"
            onClick={async () => {
              console.log("refreshing data");
              props.getAllProducts();
              props.getAllTransactions();
            }}
          >
            Refresh Data
          </button>
        </div>
      </div>
      {products.length > 0 ? (
        <div className="grid grid-cols-5 gap-4 p-8">{products}</div>
      ) : (
        <div className="flex flex-col w-full items-center p-8">
          <p className="text-2xl font-bold">No Products to Show</p>
        </div>
      )}
    </>
  );
}

export default BuyerDashboard;
