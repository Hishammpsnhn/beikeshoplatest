import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TopModal({
  handleOpen,
  open,
  setOpen,
  products,
  product,
}) {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2" gutterBottom>
          { product ? 'Product List':'Category List'}
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 350 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>SI.NO</TableCell>
                  <TableCell>Name</TableCell>
                  {product && (
                    <>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Rating</TableCell>
                      <TableCell align="right">Order Count</TableCell>
                    </>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product,i) => (
                  <TableRow key={product.name}>
                    <TableCell component="th" scope="row">
                      {i+1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {product.name || product?.category}
                    </TableCell>
                    {product && (
                      <>
                        <TableCell align="right">{product.price}</TableCell>
                        <TableCell align="right">
                          {product.averageRating}
                        </TableCell>
                        <TableCell align="right">{product.count}</TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </div>
  );
}
