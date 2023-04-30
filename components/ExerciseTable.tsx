import React from 'react';
import { Button, Table, TableColumnProps, Spacer } from "@geist-ui/core";
import type { Operation, ExerciseTableRow } from '@types';

const ExerciseTable: React.FC = () => {
	const data: ExerciseTableRow[] = [
		{ id: 1, name: 'Scale1', description: 'Practice scale 1', guide: 'asdfasfasdfasdfdsaf', operation: ['REMOVE', 'EDIT'] },
		{ id: 2, name: 'Scale2', description: 'Practice scale 2', guide: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx', operation: ['REMOVE'] },
	];

	const renderOperation: TableColumnProps<ExerciseTableRow>['render'] = (value: Operation, rowData) => {
		if (!value?.length) {
			return;
		}
		return (
			<>
				{value.includes('REMOVE') && <Button
					auto
					type="error"
					scale={1 / 2}
					onClick={() => console.log('remove', rowData)}
				>
					Remove
				</Button>}
				{value.includes('EDIT') && <Spacer inline />}
				{value.includes('EDIT') && <Button
					auto
					type="secondary"
					scale={1 / 2}
					onClick={() => console.log('edit', rowData)}
				>
					Edit
				</Button>}
			</>
		)
	};

	return (
		<Table data={data}>
			<Table.Column prop="name" label="name" />
			<Table.Column prop="description" label="description" />
			<Table.Column prop="guide" label="guide" />
			<Table.Column prop="operation" label="operation" render={renderOperation} />
		</Table>
	)
};

export default ExerciseTable;