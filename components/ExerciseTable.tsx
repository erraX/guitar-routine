import React, { useState, useRef } from "react";
import { Button, Table, Input } from "@geist-ui/core";
import type { Operation, ExerciseTableRow } from "@types";
import { mockExercises } from "../mock/mockExercises";
import { ExerciseConfirmRemoveModal } from "./ExerciseConfirmRemoveModal";
import styles from "./ExerciseTable.module.css";

const ExerciseTable: React.FC = () => {
  const curEditingInputRef = useRef<null | HTMLInputElement>(null);
  const [confirmRemoveModalVisible, setConfirmRemoveModalVisible] =
    useState(false);

  const [curActiveId, setCurActiveId] = useState<null | number>(null);
  const [curEditingPos, setCurEditingPos] = useState<null | [number, number]>(
    null
  );

  const curActiveExerciseName =
    mockExercises.find((p) => p.id === curActiveId)?.name || "";

  const showRemoveConfirmModal = (id: number) => {
    setConfirmRemoveModalVisible(true);
    setCurActiveId(id);
  };

  const handleCancelRemove = () => {
    setConfirmRemoveModalVisible(false);
    setCurActiveId(null);
  };

  const handleConfirmRemove = () => {
    setConfirmRemoveModalVisible(false);
    setCurActiveId(null);
    console.log("[TODO: Call remove]", curActiveId);
  };

  return (
    <>
      <Table data={mockExercises}>
        <Table.Column
          className={styles.editableCell}
          prop="name"
          label="name"
          render={(value: any, rowData: any, colIndex: number) => {
            const rowIndex = mockExercises.findIndex(
              (item) => item.id === rowData.id
            );
            return curEditingPos &&
              rowIndex === curEditingPos[0] &&
              colIndex === curEditingPos[1] ? (
              <div>
                <Input
                  ref={curEditingInputRef}
                  placeholder="Please input name"
                  initialValue={rowData.name}
                />
                <Button
                  auto
                  type="secondary"
                  scale={1 / 3}
                  onClick={() => {
                    console.log("submit", curEditingInputRef.current?.value);
                    setCurEditingPos(null);
                  }}
                >
                  submit
                </Button>
                <Button
                  auto
                  type="secondary"
                  scale={1 / 3}
                  onClick={() => {
                    setCurEditingPos(null);
                  }}
                >
                  cancel
                </Button>
              </div>
            ) : (
              <div>
                {value}
                <Button
                  auto
                  className={styles.inlineEditButton}
                  type="secondary"
                  scale={1 / 3}
                  onClick={() => {
                    setCurEditingPos([rowIndex, colIndex]);
                  }}
                >
                  edit
                </Button>
              </div>
            );
          }}
        />
        <Table.Column prop="description" label="description" />
        <Table.Column prop="link" label="link" />
        <Table.Column
          prop="operation"
          label="operation"
          render={(operations: any, rowData: ExerciseTableRow) =>
            (operations || []).map((operation: any) => (
              <>
                {operation === "EDIT" && (
                  <Button
                    className={styles.operationButton}
                    auto
                    type="secondary"
                    scale={1 / 3}
                    onClick={() => console.log("edit", rowData)}
                  >
                    Edit
                  </Button>
                )}
                {operation === "REMOVE" && (
                  <Button
                    className={styles.operationButton}
                    auto
                    type="error"
                    scale={1 / 3}
                    onClick={() => showRemoveConfirmModal(rowData.id)}
                  >
                    Remove
                  </Button>
                )}
              </>
            ))
          }
        />
      </Table>
      <ExerciseConfirmRemoveModal
        visible={confirmRemoveModalVisible}
        exerciseName={curActiveExerciseName}
        onCancel={handleCancelRemove}
        onConfirm={handleConfirmRemove}
      />
    </>
  );
};

export default ExerciseTable;
