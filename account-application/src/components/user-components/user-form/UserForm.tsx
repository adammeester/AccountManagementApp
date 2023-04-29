import { Button, FormControl, Input, InputLabel, styled } from '@mui/material';
import useForm from '../../../utils/useForm';
import SaveIcon from '@mui/icons-material/Save';
import { FormInputs } from '../../../utils/types';
import { FormFooter, FormStyles } from '../../../styles/FormStyles';

type UserFormProps = {
  handleSubmit: (e: any, inputs: FormInputs) => void;
};

const UserForm = ({ handleSubmit }: UserFormProps) => {
  const { inputs, handleChange } = useForm({
    name: '',
    email: '',
    salary: '',
    expenses: ''
  });

  return (
    <FormStyles>
      <form onSubmit={e => handleSubmit(e, inputs)}>
        <FormControl>
          <InputLabel htmlFor="email">Name</InputLabel>
          <Input
            id="user-name"
            name="name"
            aria-describedby="user-name"
            type="text"
            value={inputs.name}
            onChange={handleChange}
            required={true}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="user-email"
            name="email"
            aria-describedby="user-email"
            type="text"
            value={inputs.email}
            onChange={handleChange}
            required={true}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="salary">Salary $</InputLabel>
          <Input
            id="user-salary"
            name="salary"
            aria-describedby="user-salary"
            type="salary"
            value={inputs.salary}
            onChange={handleChange}
            required={true}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="expenses">Expenses $</InputLabel>
          <Input
            id="user-expenses"
            name="expenses"
            aria-describedby="user-expenses"
            type="expenses"
            value={inputs.expenses}
            onChange={handleChange}
            required={true}
          />
        </FormControl>
        <FormFooter>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            startIcon={<SaveIcon />}
            onClick={e => handleSubmit(e, inputs)}
            sx={{ width: '100%' }}
          >
            Create
          </Button>
        </FormFooter>
      </form>
    </FormStyles>
  );
};

export default UserForm;
