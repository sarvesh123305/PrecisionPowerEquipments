import React from "react";
// import Layout from "../../../components/Layout";
import {
  collection,
  deleteDoc,
  doc,
  // getDocs,
  onSnapshot,
  // setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../Database/Firebase1";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Edit from "./Edit";

const View = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = onSnapshot(
      collection(db, "customers"),
      (querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      }
    );

    // The cleanup function returned by useEffect will unsubscribe the real-time listener when the component unmounts
    return () => fetchData();
  }, []);
  // console.log(data);
  const columns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "address", label: "Address", minWidth: 100 },
    {
      id: "contact",
      label: "Contact",
      minWidth: 170,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "email",
      label: "Email",
      minWidth: 170,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "action",
      label: "Action",
      minWidth: 170,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
  ];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "customers", id));
      setData(data.filter((item) => item.id !== id));
      toast.success("Customer Deleted Successfully");
    } catch (err) {
      toast.error("Error Deleting Customer", err);
    }
  };
  const [openDialog, setOpenDialog] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");

  const [query, setQuery] = useState("");
  const handleOpenDialog = (name, email, contact, address) => {
    // setData({ name, email, contact, address });
    setName(name);
    setEmail(email);
    setContact(contact);
    setAddress(address);

    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const Search = (data) => {
    return data.filter((item) => {
      const name = item.name?.toLowerCase();
      const email = item.email?.toLowerCase();
      const contact = item.contact?.toLowerCase();
      const address = item.address?.toLowerCase();

      return (
        name?.includes(query.toLowerCase()) ||
        email?.includes(query.toLowerCase()) ||
        contact?.includes(query.toLowerCase()) ||
        address?.includes(query.toLowerCase())
      );
    });
  };
  return (
    <>
      <Box sx={{ width: "50%", margin: "20px auto" }}>
        <TextField
          label="Search input"
          InputProps={{
            type: "search",
          }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          fullWidth
        />
      </Box>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "40vh",
        }}
      >
        <Paper sx={{ width: "90%", maxWidth: "90%", overflow: "hidden" }}>
          {data.length === 0 ? (
            <Typography variant="h5" gutterBottom>
              No Customers found
            </Typography>
          ) : (
            <Box>
              <Typography variant="h5" gutterBottom>
                Customers
              </Typography>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                          // sx={{ background: "#1976D2" }}
                        >
                          <Typography fontWeight="bold" color="primary">
                            {column.label}
                          </Typography>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Search(data)
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.id}
                          >
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                                  {column.id === "action" && (
                                    <Box>
                                      <Button
                                        variant="outlined"
                                        style={{
                                          backgroundColor: "#3f51b5",
                                          color: "#fff",
                                        }}
                                        onClick={() =>
                                          handleOpenDialog(
                                            row.name,
                                            row.email,
                                            row.contact,
                                            row.address
                                          )
                                        }
                                        // onClick={() => handleEdit(row.name,row.email,row.contact,row.address)}
                                        sx={{ marginRight: "10px" }}
                                      >
                                        Edit
                                      </Button>
                                      <Button
                                        variant="outlined"
                                        style={{
                                          backgroundColor: "#f44336",
                                          color: "#fff",
                                        }}
                                        onClick={() => handleDelete(row.email)}
                                      >
                                        Delete
                                      </Button>
                                      <Edit
                                        open={openDialog}
                                        name={name}
                                        email={email}
                                        contact={contact}
                                        address={address}
                                        setName={setName}
                                        setContact={setContact}
                                        setEmail={setEmail}
                                        setAddress={setAddress}
                                        onClose={handleCloseDialog}
                                      />
                                    </Box>
                                  )}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          )}
        </Paper>
      </div>
    </>
  );
};

export default View;
