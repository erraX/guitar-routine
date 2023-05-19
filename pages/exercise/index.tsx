import type { NextPage } from "next";
import { useState } from "react";
import { useQuery, useMutation } from "react-query";

import Button from "@mui/material/Button";

import { ExerciseTable } from "@/components/ExerciseTable";

import {
  AddExerciseModal,
  AddExerciseModalProps,
} from "../../components/AddExerciseModal";
import {
  addExercise,
  deleteExercise,
  updateExercise,
} from "../../service/exercise";

const Exercise: NextPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [internalLoading, setInternalLoading] = useState(false);

  const { isLoading, data, refetch } = useQuery(
    "exercise-data",
    () => fetch("/api/exercise").then((res) => res.json()),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );


  const addMutation = useMutation(addExercise, {
    onSuccess: () => {
      
    }
  });

  const handleSubmitExercise: AddExerciseModalProps["onSubmit"] = async (
    values
  ) => {
    setIsVisible(false);
    setInternalLoading(true);
    await addExercise(values);
    await refetch();
    setInternalLoading(false);
  };

  return (
    <div>
      <h3>Exercise</h3>
      <Button
        disabled={isLoading || internalLoading}
        size="small"
        variant="outlined"
        sx={{ marginBottom: "16px" }}
        onClick={() => setIsVisible(true)}
      >
        Add exercise
      </Button>
      <ExerciseTable
        isLoading={isLoading || internalLoading}
        data={data || []}
        onDelete={async (id) => {
          setInternalLoading(true);
          await deleteExercise(id);
          await refetch();
          setInternalLoading(false);
        }}
        onUpdate={async (exercise) => {
          setInternalLoading(true);
          await updateExercise(exercise);
          await refetch();
          setInternalLoading(false);
        }}
      />
      <AddExerciseModal
        open={isVisible}
        onCancel={() => {
          setIsVisible(false);
        }}
        onSubmit={handleSubmitExercise}
      />
    </div>
  );
};

export default Exercise;
