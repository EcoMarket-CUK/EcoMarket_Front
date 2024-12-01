import React, { useState } from "react";
import styled from "styled-components";
import { adminScreen } from "../api/admin/adminScreen";
import { adminShip } from "../api/admin/adminShip";
import { adminRole } from "../api/admin/adminRole";


const Admin = () => {
  const [screeningRollup,setScreenRollup]=useState(false);
  const [shippingRollup,setShippingRollup]=useState(false);
  const [roleRollup,setRoleRollup]=useState(false);
  //심사 상태 변경 state
  const [screeningId, setScreeningId] = useState("");
  const [newScreeningStatus, setNewScreeningStatus] = useState("");


  // 배송 상태 변경 state
  const [auctionId, setAuctionId] = useState("");
  const [newShippingStatus, setNewShippingStatus] = useState("");
  const [shippingCompany, setShippingCompany] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");


  // 권한 변경 state
  const [role, setRole] = useState("");


  // 심사 상태 변경 api
  const updateScreeningStatus = () => {
    console.log("Updating Screening Status", {
      screeningId,
      newScreeningStatus,
    });
    adminScreen(screeningId,newScreeningStatus);
  };

  // 배송 상태 변경 api
  const updateShippingStatus = () => {
    console.log("Updating Shipping Status", {
      auctionId,
      newShippingStatus,
      shippingCompany,
      trackingNumber,
    });
    adminShip(auctionId,newShippingStatus,shippingCompany,trackingNumber);
  };

  //권한 변경 api
  const updateUserRole = () => {
    console.log("Updating User Role", { role });
    adminRole(role);
  };

  const sRollup=()=>{
    setScreenRollup(!screeningRollup);
  }

  const shRollup=()=>{
    setShippingRollup(!shippingRollup);
  }

  const rRollup=()=>{
    setRoleRollup(!roleRollup);
  }


  return (
    <Container>
      <h1>Admin Page</h1>

      <ScreeningSection id="1" className={screeningRollup ? "opened" : null}>
        <button className="rollupBtn" onClick={sRollup}>심사 상태 변경</button>
        {screeningRollup&&
        <>
          <h2>Update Screening Status</h2>
          <div className="input-group">
            <label htmlFor="screeningId">Auction ID:</label>
            <input
              type="number"
              id="screeningId"
              value={screeningId}
              onChange={(e) => setScreeningId(e.target.value)}
              placeholder="Enter Screening ID"
            />
          </div>
          <div className="input-group">
            <label htmlFor="newScreeningStatus">New Screening Status:</label>
            <select
              id="newScreeningStatus"
              value={newScreeningStatus}
              onChange={(e) => setNewScreeningStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="PRICE_REVIEW">PRICE_REVIEW</option>
              <option value="PRODUCT_REVIEW">PRODUCT_REVIEW</option>
              <option value="INSPECTION_COMPLETED">INSPECTION_COMPLETED</option>
              <option value="REJECTED">REJECTED</option>
            </select>
          </div>
          <button onClick={updateScreeningStatus}>Update Screening Status</button>
        </>
        }
      </ScreeningSection>

      <ShippingSection id="2" className={shippingRollup ? "opened" : null}>
      <button className="rollupBtn" onClick={shRollup}>배송 상태 변경</button>
      {shippingRollup&&<>
        <h2>Update Shipping Status</h2>
        <div className="input-group">
          <label htmlFor="auctionId">Auction ID:</label>
          <input
            type="number"
            id="auctionId"
            value={auctionId}
            onChange={(e) => setAuctionId(e.target.value)}
            placeholder="Enter Auction ID"
          />
        </div>
        <div className="input-group">
          <label htmlFor="shippingCompany">Shipping Company:</label>
          <input
            type="text"
            id="shippingCompany"
            value={shippingCompany}
            onChange={(e) => setShippingCompany(e.target.value)}
            placeholder="Enter Shipping Company"
          />
        </div>
        <div className="input-group">
          <label htmlFor="trackingNumber">Tracking Number:</label>
          <input
            type="text"
            id="trackingNumber"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Enter Tracking Number"
          />
        </div>
        <div className="input-group">
          <label htmlFor="newShippingStatus">New Shipping Status:</label>
          <select
            id="newShippingStatus"
            value={newShippingStatus}
            onChange={(e) => setNewShippingStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="PAYMENT_CONFIRMED">PAYMENT_CONFIRMED</option>
            <option value="SHIPPING_PREPARING">SHIPPING_PREPARING</option>
            <option value="SHIPPING">SHIPPING</option>
            <option value="DELIVERED">DELIVERED</option>
          </select>
        </div>
        <button onClick={updateShippingStatus}>Update Shipping Status</button>
      </>}
      </ShippingSection>

      <RoleSection id="3" className={roleRollup ? "opened" : null}>
      <button className="rollupBtn" onClick={rRollup}>사용자 권한 변경</button>
      {roleRollup&&<>
        <h2>Update User Role</h2>
        <div className="input-group">
          <label htmlFor="role">User Role:</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
        <button onClick={updateUserRole}>Update User Role</button>
      </>}
      </RoleSection>
    </Container>
  );
};


export default Admin;

const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color:white;
  position: absolute;
  top:0;
  left:0;
  width:100%;
  z-index:999;


  h1 {
    text-align: center;
    margin-bottom: 20px;
  }

  h2{
    margin-top:10px;
  }


  button {
    background-color: var(--color-main);
    color: white;
    border: none;
    padding: 10px 15px;
    margin-top: 10px;
    cursor: pointer;
    border-radius: 5px;


    &:hover {
      background-color: #22b14a;
    }
  }

  .rollupBtn{
    margin: 0;
    width:100%;
    border-bottom:1px solid black;
  }


  .input-group {
    margin-bottom: 15px;


    label {
      display: block;
      font-weight: bold;
      margin-bottom: 5px;
    }


    input,
    select {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  }
`;


const ScreeningSection = styled.div`
  margin-bottom: 30px;
  height:40px;
  border:1px solid black;
  border-radius:5px;

  &.opened{
    height:400px
  }

  h2 {
    margin-bottom: 15px;
  }
`;


const ShippingSection = styled.div`
  margin-bottom: 30px;
  height:40px;
  border:1px solid black;
  border-radius:5px;
  
  &.opened{
    height:440px
  }

  h2 {
    margin-bottom: 15px;
  }
`;


const RoleSection = styled.div`
  margin-bottom: 30px;
  height:40px;
  border:1px solid black;
  border-radius:5px;

  &.opened{
    height:400px
  }

  h2 {
    margin-bottom: 15px;
  }
`;