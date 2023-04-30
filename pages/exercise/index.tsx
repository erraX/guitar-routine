import { useState } from 'react';
import type { NextPage } from "next";
import Link from 'next/link';
import { Button, Text, Spacer, Modal } from "@geist-ui/core";
import ExerciseTable from '@/components/ExerciseTable';
import ExerciseForm from '@/components/ExerciseForm';

const Exercise: NextPage = () => {
	const [isAddModalVisible, setIsAddModalVisible] = useState(false);
	return (
		<div>
			<Text span h2>Exercise</Text>
			<Button auto onClick={() => setIsAddModalVisible(true)}>Add a exercise</Button>
			<Spacer />
			<ExerciseTable />
			<Modal visible={isAddModalVisible}>
				<Modal.Title>Add exercise</Modal.Title>
				<Modal.Content>
					<ExerciseForm />
				</Modal.Content>
				<Modal.Action passive onClick={() => setIsAddModalVisible(false)}>Cancel</Modal.Action>
				<Modal.Action passive onClick={() => console.log('save')}>Submit</Modal.Action>
			</Modal>
		</div>
	)
};

export default Exercise;