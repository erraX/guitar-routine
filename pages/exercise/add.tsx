import type { NextPage } from "next";
import { useRouter } from 'next/router'
import { Button, Spacer } from "@geist-ui/core";
import ExerciseForm from '@/components/ExerciseForm';

const AddExercise: NextPage = () => {
	const router = useRouter();
	return <>
		<ExerciseForm initialValues={{}} />
		<Spacer />
		<div>
			<Button auto type="success">Save</Button>
			<Spacer inline />
			{router.query.fromList && <Button auto onClick={() => {
				router.back();
			}}>Back</Button>}
		</div>
	</>
};

export default AddExercise;
