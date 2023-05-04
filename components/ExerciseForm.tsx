import React from 'react';
import { Input, Spacer, Textarea, Text } from '@geist-ui/core';

export interface ExerciseFormProps {
	initialValues: {

	}
}

const ExerciseForm: React.FC<ExerciseFormProps> = ({ initialValues }) => {
	return (
		<>
      {/* required */}
			<Input placeholder="Exercise name">
				Name
			</Input>
			<Spacer />
			<Input placeholder="Exercise description">
				Description
			</Input>
			<Text>Link</Text>
			<Textarea placeholder="Link" />
		</>
	);
};

export default ExerciseForm;

