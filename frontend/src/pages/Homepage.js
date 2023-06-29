import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Homepage(props) {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col w-full items-center mt-10 space-y-8">
        {props.appState.account === "" ? null : (
          <p className="text-lg">
            <b>Wallet Connected: </b>
            {props.appState.account}
          </p>
        )}
        <div className="flex flex-row space-x-8">
          {props.appState.account === "" ? (
            <button className="btn" onClick={() => props.setUpWeb3()}>
              Connect Wallet
            </button>
          ) : (
            <button className="btn" onClick={() => props.walletLogout()}>
              Disconnect Wallet
            </button>
          )}
        </div>
        <p className="font-semibold">Buyer</p>
        <div className="flex flex-row space-x-8">
          <button className="btn" onClick={() => props.loginUser("buyer")}>
            Login as Buyer
          </button>

          <button className="btn" onClick={() => props.regsisterUser("buyer")}>
            Register as Buyer
          </button>
        </div>
        <p className="font-semibold">Seller</p>
        <div className="flex flex-row space-x-8">
          <button className="btn" onClick={() => props.loginUser("seller")}>
            Login as Seller
          </button>

          <button className="btn" onClick={() => props.regsisterUser("seller")}>
            Register as Seller
          </button>
        </div>
      </div>
    </>
  );
}

export default Homepage;
