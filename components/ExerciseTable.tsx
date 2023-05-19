import React, { useState, useRef } from "react";
import { format } from "date-fns";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import {
  DataGrid,
  GridColDef,
  GridCellEditStopParams,
  GridCellEditStopReasons,
  MuiEvent,
  useGridApiRef,
} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ExerciseTableRow } from "../types";

export interface ExerciseTableProps {
  isLoading?: boolean;
  data: ExerciseTableRow[];
  onDelete(id: number | string): void;
  onUpdate(exercise: any): void;
}

export const ExerciseTable: React.FC<ExerciseTableProps> = ({
  isLoading,
  data,
  onDelete,
  onUpdate,
}) => {
  const apiRef = useGridApiRef();
  const [isRemoveModalVisible, setIsRemoveModalVisible] = useState(false);
  const [curRemoveId, setCurRemoveId] = useState<null | number | string>(null);

  const curRemoveItemName = data.find((item) => item.id === curRemoveId)?.name || '';

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 300,
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      width: 250,
      editable: true,
    },
    {
      field: "link",
      headerName: "Link",
      width: 100,
      editable: true,
      renderCell: (params) => {
        return <Link href={params.value}>{params.value}</Link>;
      },
    },
    {
      field: "createdAt",
      headerName: "Create Date",
      width: 130,
      renderCell: (params) => {
        return format(new Date(params.value), "yyyy-MM-dd");
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
            onClick={() => {
              setCurRemoveId(params.id);
              setIsRemoveModalVisible(true);
            }}
          />
        );
      },
    },
  ];

  const handleConfirmRemove = () => {
    if (curRemoveId) {
      onDelete(curRemoveId);
    }
    setIsRemoveModalVisible(false);
  };

  const handleCancelRemove = () => {
    setCurRemoveId(null);
    setIsRemoveModalVisible(false);
  };

  return (
    <>
      <DataGrid
        hideFooter
        hideFooterPagination
        hideFooterSelectedRowCount
        disableColumnFilter
        apiRef={apiRef}
        loading={isLoading}
        rows={data}
        columns={columns}
        rowHeight={38}
        columnHeaderHeight={38}
        onCellEditStop={(params: GridCellEditStopParams, event: MuiEvent) => {
          if (params.reason === GridCellEditStopReasons.cellFocusOut) {
            event.defaultMuiPrevented = true;
            return;
          }

          if (params.reason === GridCellEditStopReasons.escapeKeyDown) {
            return;
          }

          const updatedItem = apiRef.current.getRowWithUpdatedValues(params.id, params.field);
          if (updatedItem[params.field] === params.value) {
            return;
          }

          onUpdate(updatedItem);
        }}
      />
      <Dialog
        open={isRemoveModalVisible}
        onClose={handleCancelRemove}
      >
        <DialogTitle>
          Confirm remove
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you confirm to remove { curRemoveItemName } ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelRemove}>Cancel</Button>
          <Button onClick={handleConfirmRemove} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
