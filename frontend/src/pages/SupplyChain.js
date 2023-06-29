// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// function SupplyChain(props) {
//   const navigate = useNavigate();
//   const { productName } = useParams();
//   return (
//     <>
//       <div className="flex flex-row justify-between p-8 items-center">
//         <p className="text-2xl font-bold">
//           Supply Chain History for {productName}
//         </p>
//         <div className="flex flex-row space-x-4">
//           <button
//             className="btn"
//             onClick={() => {
//               navigate("/");
//             }}
//           >
//             Homepage
//           </button>
//         </div>
//       </div>
//       <div className="flex flex-col w-full p-8 items-center">
//         <div className="overflow-x-auto text-center">
//           <table className="table  w-full ">
//             <tbody>
//               <tr className="hover">
//                 <th>
//                   <b>Raw Material Producer</b>
//                 </th>
//                 <td>Abhinav</td>
//                 <td>XYZ Cotton Farms, Chennai, Tamilnadu</td>
//                 <td>0x3513...35351</td>
//                 <td>10 Apr 2023</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// }

// export default SupplyChain;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const getRandomName = () => {
  const names = [
    "Abhinav",
    "Aarav",
    "Aryan",
    "Aditi",
    "Akshay",
    "Anaya",
    "Arjun",
    "Avni",
    "Dev",
    "Dia",
    "Gaurav",
    "Isha",
    "Kiran",
    "Krishna",
    "Maya",
    "Nikhil",
    "Nisha",
    "Rahul",
    "Riya",
    "Sanjay",
    "Aaradhya",
    "Aadhya",
    "Aarav",
    "Aarna",
    "Advait",
    "Amaya",
    "Arya",
    "Aryan",
    "Ishaan",
    "Kavya",
    "Neha",
    "Rishabh",
    "Riya",
    "Sahil",
    "Samaira",
    "Tanvi",
    "Vedant",
    "Yash",
    "Zara",
  ];
  return names[Math.floor(Math.random() * names.length)];
};

const companyPools = {
  "Raw Material Producer": [
    "ABC Cotton Farms",
    "XYZ Cotton Farms",
    "Green Mills Cottons Agriculture Lands",
    "Sunshine Agro Farms",
  ],
  "Date of Harvest": [
    "Harvest Masters",
    "Crop Care Harvesters",
    "Golden Harvest Agri Services",
    "Nature's Bounty Harvesting Co.",
  ],
  "Raw Material Processor": [
    "Processor Pro Co.",
    "Quality Raw Material Processors",
    "Globe Processing Solutions",
    "Efficient Materials Processing",
  ],
  Manufacturer: [
    "Manufacturing Innovations Ltd.",
    "Quality Manufacturing Co.",
    "Global Manufacturing Solutions",
    "Precision Manufacturers Inc.",
  ],
  "Assembly and Packaging": [
    "Assembly Masters",
    "Packaging Pros",
    "Efficient Assembly Solutions",
    "Global Packaging Services",
  ],
  Distributor: [
    "Global Distributors Inc.",
    "Distribution Solutions Ltd.",
    "Fast Track Distributors",
    "Worldwide Distribution Co.",
  ],
  Retail: [
    "Retail Excellence",
    "Quality Retailers Inc.",
    "Global Retail Solutions",
    "Premier Retail Stores",
  ],
};

const getRandomCompanyName = (stage) => {
  const pool = companyPools[stage];
  if (!pool || pool.length === 0) return ""; // Handle case when pool is not defined or empty

  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
};

const getRandomWalletAddress = () => {
  const address = "0x" + Math.random().toString(16).slice(2, 10);
  const trimmedAddress = address.slice(0, 6) + "..." + address.slice(-4);
  return trimmedAddress;
};

const getRandomPastDate = (index, firstDate) => {
  const randomDays = Math.floor(Math.random() * 3 + 2);
  const pastDate = new Date(
    firstDate.getTime() + index * randomDays * 24 * 60 * 60 * 1000
  );
  return pastDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const generateTableData = () => {
  const tableData = [];
  let firstStageDate;

  for (let i = 0; i < 7; i++) {
    const stageNames = [
      "Raw Material Producer",
      "Date of Harvest",
      "Raw Material Processor",
      "Manufacturer",
      "Assembly and Packaging",
      "Distributor",
      "Retail",
    ];

    const name = getRandomName();
    const companyName = getRandomCompanyName(stageNames[i]);
    const walletAddress = getRandomWalletAddress();

    if (i === 0) {
      firstStageDate = getRandomPastDate(0, new Date()); // Generate a random first stage date
      tableData.push([
        stageNames[i],
        name,
        companyName,
        walletAddress,
        firstStageDate,
      ]);
    } else {
      const date = getRandomPastDate(i, new Date(firstStageDate)); // Use the first stage date as the reference
      tableData.push([stageNames[i], name, companyName, walletAddress, date]);
    }
  }

  return tableData;
};

const SupplyChain = () => {
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();
  const { productName } = useParams();

  const getRandomNumber = () => {
    return Math.floor(Math.random() * (2200 - 250 + 1)) + 250;
  };

  const getRandomFloat = () => {
    const randomNumber = (Math.random() * (50.0 - 0.5) + 0.5).toFixed(2);
    return parseFloat(randomNumber);
  };

  const getRandomString = () => {
    const strings = ["Organic", "Inorganic"];
    const randomIndex = Math.floor(Math.random() * strings.length);
    return strings[randomIndex];
  };

  useEffect(() => {
    const randomizedData = generateTableData();
    setTableData(randomizedData);
  }, []);

  return (
    <>
      <div className="flex flex-row justify-between p-8 items-center">
        <p className="text-2xl font-bold">
          Supply Chain History for {productName}
        </p>
        <div className="flex flex-row space-x-4">
          <button
            className="btn"
            onClick={() => {
              navigate("/");
            }}
          >
            Homepage
          </button>
        </div>
      </div>
      <div className="flex flex-col w-full p-8 items-center">
        <div className="overflow-x-auto text-center">
          <table className="table w-full">
            <tbody>
              {tableData.map((rowData, index) => (
                <tr key={index}>
                  {rowData.map((cellData, cellIndex) => (
                    <td key={cellIndex}>{cellData}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-row justify-center w-full space-x-16 pb-16">
        <div className="flex flex-col items-center">
          <p className="text-4xl font-bold">{getRandomNumber()} Kms.</p>
          <p className="w-56 text-sm text-center">
            Distance travelled by the product from origin to retailer
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-4xl font-bold">{getRandomFloat()} Kgs.</p>
          <p className="w-56 text-sm text-center">
            Amount of Carbon Emission throughout the supply chain
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-4xl font-bold">{getRandomString()}</p>
          <p className="w-56 text-sm text-center">
            Nature of Raw Material Manufacturing
          </p>
        </div>
      </div>
    </>
  );
};

export default SupplyChain;
