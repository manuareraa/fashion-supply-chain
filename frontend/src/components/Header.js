import React from "react";

function Header(props) {
  return (
    <div className="flex flex-col items-center  py-8">
      <p className="text-custom-primary text-3xl">Fashion Supply Chain</p>
      {props.appState.loggedIn === true
        ? props.appState.role === "buyer"
          ? "Welcome Buyer"
          : "Welcome Seller"
        : null}
    </div>
  );
}

export default Header;
