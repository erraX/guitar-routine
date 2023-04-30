import React from 'react';
import { Input, Spacer, Textarea, Text } from '@geist-ui/core';

export interface ExerciseFormProps {
	initialValues: {

	}
}

const ExerciseForm: React.FC<ExerciseFormProps> = ({ initialValues }) => {
	return (
		<>
			<Input placeholder="Exercise name">
				Name
			</Input>
			<Spacer />
			<Input placeholder="Exercise description">
				Description
			</Input>
			<Text>Guide</Text>
			<Textarea placeholder="Exercise guide" />
		</>
	);
};

export default ExerciseForm;

