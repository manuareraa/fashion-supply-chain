import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { toast, Toaster } from "react-hot-toast";

function AddProduct(props) {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: "",
    image: "",
  });
  const [showQR, setShowQR] = useState(false);
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");

  //   const handleImageChange = (e) => {
  //     console.log(
  //       "File Uploaded: ",
  //       e.target.files[0],
  //       URL.createObjectURL(e.target.files[0], image)
  //     );
  //     if (e.target.files[0]) {
  //       setImageName(e.target.files[0].name);
  //       setImage(URL.createObjectURL(e.target.files[0]));
  //     }
  //   };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        // The image file has been loaded as an ArrayBuffer
        const imageBuffer = reader.result;
        console.log("Image Buffer: ", imageBuffer);

        // Convert the ArrayBuffer to a Uint8Array
        const imageArray = new Uint8Array(imageBuffer);

        // Update state with the image data
        setImageName(file.name);
        setImage(imageArray);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <>
      <div className="flex flex-row justify-between p-8 items-center">
        <p className="text-2xl font-bold">Add New Product</p>
        <div className="flex flex-row space-x-4">
          <button
            className="btn"
            onClick={() => {
              navigate("/seller-dashboard");
            }}
          >
            Go to Dashboard
          </button>
          <button
            className="btn"
            onClick={() => {
              navigate("/seller-history");
            }}
          >
            View History
          </button>
          <button
            className="btn"
            onClick={async () => {
              props.getAllProducts();
              props.getAllTransactions();
            }}
          >
            Refresh Data
          </button>
        </div>
      </div>
      <div className="flex flex-col p-8 space-y-4 items-center">
        <form className="grid grid-cols-2 gap-4 items-center mb-8">
          <label className="col-start-1 col-span-1 text-gray-700">
            Product Name:
          </label>
          <input
            type="text"
            placeholder="Product Name"
            className="input"
            onChange={(e) => {
              setProduct({
                ...product,
                name: e.target.value,
              });
            }}
          />
          <label className="col-start-1 col-span-1 text-gray-700">
            Price per Unit:
          </label>
          <input
            type="text"
            placeholder="Product Price"
            className="input"
            onChange={(e) => {
              setProduct({
                ...product,
                price: e.target.value,
              });
            }}
          />
          <label className="col-start-1 col-span-1 text-gray-700">
            Description:
          </label>
          <input
            type="text"
            placeholder="Product Description"
            className="input"
            onChange={(e) => {
              setProduct({
                ...product,
                description: e.target.value,
              });
            }}
          />
        </form>
        <div className="flex flex-col w-full justify-center">
          <div className="flex flex-col w-full items-center">
            {imageName === "" ? (
              <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer ">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M17.71 8.29a1 1 0 00-1.42 0L11 13.59V4a1 1 0 00-2 0v9.59l-5.29-5.3a1 1 0 00-1.42 1.42l7 7a1 1 0 001.42 0l7-7a1 1 0 000-1.42z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="mt-2 text-base  leading-normal ">
                  Upload Image
                </span>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <p className="font-semibold">Image Successfully Uploaded</p>
                {/* <img
                  className="rounded-t-lg w-56 h-64 object-fit"
                  src={`data:image/jpeg;base64,${image.toString("base64")}`}
                  alt="Shirt"
                /> */}
                {/* <p className="font-semibold">{imageName}</p> */}
              </div>
            )}
          </div>

          <div className="flex flex-col w-full items-center mt-4">
            {showQR === true ? (
              <div className="flex flex-col items-center justify-start   space-y-4">
                <p className="font-semibold">QR Code</p>
                <QRCode
                  value={
                    "http://localhost:3000/supply-chain/" +
                    product.name.toLowerCase().replace(/\s+/g, "-")
                  }
                  size={210}
                />
                <p className="font-semibold">&nbsp;</p>
              </div>
            ) : (
              <button
                className="btn"
                onClick={async () => {
                  if (
                    product.name === "" ||
                    product.price === 0 ||
                    product.description === "" ||
                    image === null
                  ) {
                    toast.error("Please fill all the fields");
                    return;
                  } else {
                    setShowQR(true);
                  }
                }}
              >
                Generate QR Code
              </button>
            )}
          </div>
        </div>
        <button
          className="btn"
          onClick={() => {
            setImage(null);
            setImageName("");
            setShowQR(false);
          }}
        >
          Reupload
        </button>
        <button
          className="btn"
          onClick={() => {
            console.log(product);
            if (
              product.name === "" ||
              product.price === 0 ||
              product.description === ""
            ) {
              toast.error("Please fill all the fields");
              return;
            } else {
              props.addProduct(
                product.name,
                product.price,
                product.description,
                image
              );
              setImage(null);
              setImageName("");
              setShowQR(false);
              setProduct({
                name: "",
                price: 0,
                description: "",
              });
            }
          }}
        >
          Add Product
        </button>
      </div>
    </>
  );
}

export default AddProduct;
