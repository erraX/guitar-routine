import { FC, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { noop } from '../../utils/noop';

export interface MetroPlanFormValues {
  bpm: number;
  groups: number;
  duration: number;
  breakTime: number;
}

interface MetroPlanFormProps {
  initialValues?: MetroPlanFormValues;
  onSubmit: (values: MetroPlanFormValues) => void;
  onCancel?: (...args: any) => any;
}

const INITIAL_VALUES = {
  bpm: 120,
  groups: 2,
  duration: 5,
  breakTime: 5,
};

export const MetroPlanForm: FC<MetroPlanFormProps> = ({
  initialValues = INITIAL_VALUES,
  onSubmit,
  onCancel,
}) => {
  const [values, setValues] = useState<MetroPlanFormValues>(initialValues);

  const handleSubmit = () => {
    onSubmit(values);
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>Bpm to practice</Form.Label>
        <Form.Control
          type="text"
          value={values.bpm}
          onChange={(evt) => setValues((prevValues) => ({
            ...prevValues,
            bpm: Number(evt.target.value),
          }))}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Groups to practice</Form.Label>
        <Form.Control
          type="text"
          value={values.groups}
          onChange={(evt) => setValues((prevValues) => ({
            ...prevValues,
            groups: Number(evt.target.value),
          }))}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Duration of each group:</Form.Label>
        <Form.Control
          type="text"
          value={values.duration}
          onChange={(evt) => setValues((prevValues) => ({
            ...prevValues,
            duration: Number(evt.target.value),
          }))}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Break time between each groups:</Form.Label>
        <Form.Control
          type="text"
          value={values.breakTime}
          onChange={(evt) => setValues((prevValues) => ({
            ...prevValues,
            breakTime: Number(evt.target.value),
          }))}
        />
      </Form.Group>
      <Button onClick={handleSubmit}>Submit</Button>
      <Button variant="danger" onClick={onCancel}>Cancel</Button>
    </Form>
  );
};
