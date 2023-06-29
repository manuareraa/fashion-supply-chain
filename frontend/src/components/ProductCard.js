import React, { useState } from "react";

function ProductCard() {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="flex flex-col rounded-lg items-center bg-custom-primary/50 w-56">
      <img
        className="rounded-t-lg w-56 h-64 object-fit"
        src="blob:http://localhost:3000/93036ece-0a46-41ef-89a9-61bd86b57d82"
        alt="Shirt"
      />
      <div className="flex flex-col p-4 space-y-2 items-center">
        <p className="text-md">Shirt</p>
        <p className="text-md">
          <b>Price:</b> 100
        </p>
        <button className="btn btn-custom">Buy</button>
      </div>
      <div className="flex flex-row justify-between w-full p-4 items-center">
        <div className="flex flex-col">
          <p className="font-bold">Seller</p>
          <p className="font-medium text-sm ">0x1531...2143</p>
        </div>
        <img
          src="blob:http://localhost:3000/93036ece-0a46-41ef-89a9-61bd86b57d82"
          className="w-8 h-8"
          alt="QR Code"
        />
      </div>
      <p
        className="w-full text-center mb-4 text-xs underline hover:cursor-pointer"
        onClick={toggleDetails}
      >
        {showDetails ? "Hide Product Details" : "View Product Details"}
      </p>
      {showDetails && (
        <div className="w-full text-xs font-thin pb-4 px-4 text-center">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae
          nostrum eos illum aliquid facilis quaerat ad magnam aspernatur
          repudiandae! Eaque ipsum pariatur repudiandae neque consectetur
          cupiditate natus ipsa ratione sequi?
        </div>
      )}
    </div>
  );
}

export default ProductCard;
