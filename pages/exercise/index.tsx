import type { NextPage } from "next";
import { Button, Text, Spacer, Modal, useModal } from "@geist-ui/core";
import ExerciseTable from '@/components/ExerciseTable';
import ExerciseForm from '@/components/ExerciseForm';

const Exercise: NextPage = () => {
	const { setVisible, bindings } = useModal();

	return (
		<div>
			<Text span h2>Exercise</Text>
			<Button auto onClick={() => setVisible(true)}>Add exercise</Button>
			<Spacer />
			<ExerciseTable />
			<Modal {...bindings}>
				<Modal.Title>Add exercise</Modal.Title>
				<Modal.Content>
					<ExerciseForm initialValues={{}} />
				</Modal.Content>
				<Modal.Action passive onClick={() => setVisible(false)}>Cancel</Modal.Action>
				<Modal.Action passive onClick={() => console.log('save')}>Submit</Modal.Action>
			</Modal>
		</div>
	)
};

export default Exercise;