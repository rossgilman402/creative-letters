import { useState } from "react";
import "./App.css";

const App = () => {
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState("");
  const [userName, setUserName] = useState("");
  const [dateSent, setDateSent] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [zipCode, setZipCode] = useState("");
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleInputChange = (e) => {
    setUserName(e.target.value);
  };

  const handleBusinessChange = (e) => {
    setSelectedBusiness(e.target.value);
  };

  const handleAddressChange = (e) => {
    setSelectedAddress(e.target.value);

    switch (e.target.value) {
      case "261 Gates Avenue":
      case "277 Eastern Parkway":
        setZipCode("11238");
        break;
      case "170 Fenimore Street":
      case "209 Sullivan Place":
        setZipCode("11225");
        break;
      case "323 East 9th Street":
        setZipCode("11218");
        break;
      default:
        setZipCode("");
        break;
    }
  };

  const handleApartmentChange = (e) => {
    setApartmentNumber(e.target.value);
  };

  const handleDateSentChange = (e) => {
    const localDate = new Date(e.target.value); // Get local date from input
    const utcDate = new Date(
      localDate.getTime() + localDate.getTimezoneOffset() * 60000
    ); // Convert to UTC
    setDateSent(utcDate.toISOString().split("T")[0]); // Set as UTC string in "yyyy-MM-dd" format
  };

  const handleExpireDateChange = (e) => {
    setExpireDate(e.target.value);
  };

  const handleDownloadFile = () => {
    const formattedDateSent = new Date(dateSent).toLocaleDateString("en-US", {
      timeZone: "UTC",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formattedExpireDate = new Date(expireDate).toLocaleDateString(
      "en-US",
      { timeZone: "UTC", year: "numeric", month: "long", day: "numeric" }
    );

    const inputTemplate = `
    <html xmlns:w="urn:schemas-microsoft-com:office:word">
    <head>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                font-size: 14px;
            }
            label {
                display: block;
                margin-bottom: 10px;
            }
            select, input {
                width: 100%;
                padding: 10px;
                margin-bottom: 15px;
            }
            button {
                background-color: #4CAF50;
                color: white;
                padding: 10px 15px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }
            button:hover {
                background-color: #45a049;
            }
            p {
                margin: 0;
            }
            .heading {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
            .center {
                text-align: center;
            }
        </style>
    </head>
    <body>

      <div class="center">
        <p>${selectedBusiness}</p>
        <p>20 JAY STREET SUITE 506</p>
        <p>BROOKLYN, NY 11201</p>
        <p>(718)-743-6823</p>
      </div>
        <br />
        <br />
        <br />
        <br />
        <p>${userName}</p>
        <p>${selectedAddress}</p>
        <p>Apartment ${apartmentNumber}</p>
        <p>Brooklyn, New York ${zipCode}</p>
        <br />
        <p>${currentDate}</p>
        <br />
        <p>Re: Lease Non-Renewal</p>
        <br />
        <p>Dear ${userName},</p>
        <br />
        <p>As you are aware, the lease for your apartment will expire on ${formattedExpireDate}.</p>
        <br />
        <p>A renewal lease form was sent to you on ${formattedDateSent}, requesting that you sign
        and return to me, indicating your choice of either a one or two-year renewal lease. As of
        this date, we have had no response. We are enclosing herewith, a duplicate set of said
        renewal lease forms and request that your immediate attention be given to the same. Your
        failure to do so may be grounds for "the commencement of an action by the owner to
        evict you from your apartment".</p>
        <p>Very truly yours,</p>
        <br />
        <br />
        <br />
        <br />
        <p>Brendan Gilman</p>
        <p>Property Manager</p>
    </body>
    </html>
    `;

    const blob = new Blob([inputTemplate], { type: "application/msword" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "Lease_Non_Renewal_Letter.doc";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="main-container">
      <h1>Creative Housing Filing</h1>
      <label>
        Select Business:
        <select value={selectedBusiness} onChange={handleBusinessChange}>
          <option value="">Select Business</option>
          <option value="CREATIVE HOUSING LTD.">CREATIVE HOUSING LTD.</option>
          <option value="261 GATES AVENUE LLC.">261 GATES AVENUE LLC.</option>
          <option value="323 EAST 9TH STREET LLC.">
            323 EAST 9TH STREET LLC.
          </option>
        </select>
      </label>

      <label>
        Select Address:
        <select value={selectedAddress} onChange={handleAddressChange}>
          <option value="">Select Address</option>
          <option value="277 Eastern Parkway">277 Eastern Parkway</option>
          <option value="170 Fenimore Street">170 Fenimore Street</option>
          <option value="209 Sullivan Place">209 Sullivan Place</option>
          <option value="261 Gates Avenue">261 Gates Avenue</option>
          <option value="323 East 9th Street">323 East 9th Street</option>
        </select>
      </label>

      <label>
        Apartment Number:
        <input
          type="text"
          value={apartmentNumber}
          onChange={handleApartmentChange}
        />
      </label>

      <label>
        Enter Your Name:
        <input type="text" value={userName} onChange={handleInputChange} />
      </label>

      <label>
        Date Sent:
        <input type="date" value={dateSent} onChange={handleDateSentChange} />
      </label>

      <label>
        Expiration Date:
        <input
          type="date"
          value={expireDate}
          onChange={handleExpireDateChange}
        />
      </label>

      <button onClick={handleDownloadFile}>Download File</button>
      <p className="center">Current Date: {currentDate}</p>
    </div>
  );
};

export default App;
