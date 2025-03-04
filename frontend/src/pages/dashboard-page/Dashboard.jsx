import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllTickets,
  fetchKPIs,
  getAdminState,
} from "../../features/admin/adminSlice";
import {
  CustomCard,
  CustomTable,
  ViewTicket,
  BackButton,
} from "../../components";
import "./dashboard.css";

function Dashboard() {
  const dispatch = useDispatch();

  const [openViewTicket, setOpenViewTicket] = useState(false);
  const [viewTicketData, setViewTicketData] = useState({});

  const { tickets, kpis, isLoading } = useSelector(getAdminState);

  useEffect(() => {
    dispatch(fetchKPIs());
    dispatch(fetchAllTickets());
  }, [dispatch]);

  const closeViewTicketModal = () => {
    setOpenViewTicket(false);
    setViewTicketData({});
    dispatch(fetchAllTickets());
  };

  const handleEditUser = (rowData) => {
    setViewTicketData(rowData);
    setOpenViewTicket(true);
  };

  const viewTicketButton = (cell, row, rowIndex, formatExtraData) => {
    return (
      <>
        <button
          className="btn btn-outline-dark"
          onClick={() => handleEditUser(row)}
        >
          View Ticket
        </button>
      </>
    );
  };

  const columns = [
    {
      dataField: "userEmail",
      text: "User Email",
      sort: true,
    },
    {
      dataField: "userName",
      text: "User name",
      sort: true,
    },
    {
      dataField: "project",
      text: "Project Name",
      sort: true,
    },
    {
      dataField: "title",
      text: "Issue Title",
      sort: true,
    },
    {
      dataField: "description",
      text: "Description",
      sort: true,
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
    },
    {
      dataField: "createdAt",
      text: "Created",
      sort: true,
    },
    {
      dataField: "actions",
      text: "Action",
      formatter: viewTicketButton,
      style: { fontSize: "small" },
    },
  ];

  return (
    <>
      <div>
        <BackButton url="/home" />
        <hr></hr>
        <div className="card-layout">
          <CustomCard title="Total Tickets" value={kpis?.totalTickets} />
          <CustomCard title="Open Ticket" value={kpis?.openTickets} />
          <CustomCard title="Resolved Tickets" value={kpis?.closedTickets} />
        </div>
      </div>
      <hr></hr>
      <div className="table-container">
        <h1 className="heading">All Tickets</h1>
        <CustomTable
          keyField="_id"
          data={tickets}
          columns={columns}
          loading={isLoading}
        />
      </div>
      <ViewTicket
        show={openViewTicket}
        handleClose={closeViewTicketModal}
        data={viewTicketData}
        type="adminForm"
      />
    </>
  );
}

export default Dashboard;
