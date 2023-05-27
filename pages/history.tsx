import React, { useState } from "react";
import { format } from "date-fns";
import { useQuery } from "react-query";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Container from "@mui/material/Container";
import { deleteTraining } from '@/service/training';
import type { NextPage } from "next";

const History: NextPage = () => {
  const [internalLoading, setInternalLoading] = useState(false);

  const { isLoading, data, refetch } = useQuery(
    "training-data",
    () => fetch("/api/training").then((res) => res.json()),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  const columns: GridColDef[] = [
    {
      field: "exerciseName",
      headerName: "Exercise Name",
      width: 400,
    },
    {
      field: "groups",
      headerName: "Groups",
      width: 100,
    },
    {
      field: "duration",
      headerName: "Duration",
      width: 100,
    },
    {
      field: "restDuration",
      headerName: "Rest Duration",
      width: 100,
    },
    {
      field: "bpm",
      headerName: "BPM",
      width: 100,
    },
    {
      field: "createdAt",
      headerName: "Date",
      width: 130,
      renderCell: (params) => {
        return format(new Date(params.value), "yyyy-MM-dd HH:mm");
      },
    },
    {
      field: "operation",
      headerName: "Operations",
      width: 80,
      renderCell: (params) => {
        return (
          <DeleteForeverOutlinedIcon
            color="error"
            sx={{ cursor: "pointer" }}
            onClick={async () => {
              setInternalLoading(true);
              try {
                await deleteTraining(params.id);
                refetch();
              } catch (error) {
                console.error(error);
              } finally {
                setInternalLoading(false);
              }
            }}
          />
        );
      },
    },
  ];

  return (
    <Container>
      <h2>History</h2>
      <DataGrid
        hideFooter
        hideFooterPagination
        hideFooterSelectedRowCount
        disableColumnFilter
        loading={isLoading || internalLoading}
        rows={data || []}
        columns={columns}
        rowHeight={38}
        columnHeaderHeight={38}
      />
    </Container>
  );
};

export default History;
