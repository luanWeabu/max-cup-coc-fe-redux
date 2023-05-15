import { Button, Paper, Table, TableContainer, TableHead } from "@mui/material";
import React from "react";

export default function Order() {
  const columns = useMemo(() => {
    return [
      {
        id: "name",
        label: "Name",
        minWidth: 170,
        align: "center",
        format: (value) => (value ? value.toLocaleString("en-US") : ""),
      },
    ];
  });

  return (
    <Paper>
      <Button
        variant="outlined"
        style={{ background: "white", color: "blue", margin: 20 }}
      >
        Create Category
      </Button>
      <TableContainer>
        
        <Table>
          <TableHead style={{ backgroundColor: "black" }}></TableHead>
        </Table>
      </TableContainer>
    </Paper>
  );
}
