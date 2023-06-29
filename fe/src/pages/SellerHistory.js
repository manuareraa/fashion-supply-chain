import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SellerHistory(props) {
  const navigate = useNavigate();

  const [txns, setTxns] = useState([]);
  const [units, setUnits] = useState(0);
  const [earnings, setEarnings] = useState(0);

  const processTxns = () => {
    let tempArr = [];
    setEarnings(0);
    setUnits(0);
    props.appState.transactions.forEach((txn) => {
      if (txn.seller === props.appState.account) {
        setUnits((prev) => prev + 1);
        setEarnings((prev) => prev + parseFloat(txn.amount));
        let element = (
          <div className="flex flex-row justify-between p-4 items-center rounded-lg bg-custom-primary/40 px-8">
            <p className="w-40">{txn.productName}</p>
            <div className="flex flex-col">
              <p className="text-xs">Buyer</p>
              <p className="text-md">
                <b>{txn.buyer.slice(0, 6) + "..." + txn.buyer.slice(-4)}</b>
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-xs">Date</p>
              <p className="text-md">
                <b>{txn.timestamp}</b>
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-xs">Transaction Hash</p>
              <p className="text-md">
                <b>
                  {txn.transactionHash.slice(0, 6) +
                    "..." +
                    txn.transactionHash.slice(-4)}
                </b>
              </p>
            </div>
            <div className="flex flex-col w-40">
              <p className="text-xs">Price</p>
              <p className="text-md">
                <b>{txn.amount} MATIC</b>
              </p>
            </div>
          </div>
        );
        tempArr.push(element);
        setTxns(tempArr);
      }
    });
  };

  useEffect(() => {
    processTxns();
  }, [props.appState.transactions]);

  return (
    <>
      <div className="flex flex-row justify-between p-8 items-center">
        <p className="text-2xl font-bold">Purchase History</p>
        <div className="flex flex-row space-x-4">
          <button
            className="btn"
            onClick={() => {
              navigate("/add-product");
            }}
          >
            Add Product
          </button>
          <button
            className="btn"
            onClick={() => {
              navigate("/seller-dashboard");
            }}
          >
            Go To Dashboard
          </button>
          <button
            className="btn"
            onClick={async () => {
              console.log("refreshing data");
              props.getAllProducts();
              props.getAllTransactions();
              processTxns();
            }}
          >
            Refresh Data
          </button>
        </div>
      </div>
      <div className="flex flex-row justify-center space-x-8">
        <p className="text-lg">
          <b>Sold Units:</b> &nbsp;
          {units}
        </p>
        <p className="text-lg">
          <b>Earnings:</b> &nbsp;
          {parseFloat(earnings).toFixed(6)} MATIC
        </p>
      </div>
      {txns.length > 0 ? (
        <div className="flex flex-col p-8 space-y-4">{txns}</div>
      ) : (
        <div className="flex flex-col w-full items-center p-8">
          <p className="text-2xl font-bold">No Purchases to Show</p>
        </div>
      )}
    </>
  );
}

export default SellerHistory;
