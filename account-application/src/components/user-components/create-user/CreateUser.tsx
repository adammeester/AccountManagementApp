import { Fade, IconButton, Modal, styled } from '@mui/material';
import UserForm from '../user-form';
import CloseIcon from '@mui/icons-material/Close';
import { FormInputs, NewUser } from '../../../utils/types';
import {
  ModalContentContainer,
  ModalHeader
} from '../../../styles/ModalStyles';

type CreateUserProps = {
  isOpen: boolean;
  handleCreateUser: (user: NewUser) => void;
  handleClose: () => void;
};

const CreateUser = ({
  isOpen,
  handleClose,
  handleCreateUser
}: CreateUserProps) => {
  const handleSubmit = (e: any, inputs: FormInputs) => {
    e.preventDefault();
    handleCreateUser({
      name: inputs.name,
      email: inputs.email,
      salary: inputs.salary,
      expenses: inputs.expenses
    });
  };
  return (
    <Modal
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textShadow: '1px 0.5px 0.2em black'
      }}
      aria-labelledby="login-modal"
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={isOpen}>
        <ModalContentContainer>
          <ModalHeader>
            <h2>Create user</h2>
            <IconButton onClick={handleClose}>
              <CloseIcon className="closeButton"></CloseIcon>
            </IconButton>
          </ModalHeader>
          <UserForm handleSubmit={handleSubmit} />
        </ModalContentContainer>
      </Fade>
    </Modal>
  );
};

export default CreateUser;
