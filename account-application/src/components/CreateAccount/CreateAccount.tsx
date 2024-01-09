import { Modal, Fade, IconButton, Button, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react';
import {
  ModalContentContainer,
  ModalFooter,
  ModalHeader
} from '../../styles/ModalStyles';
import { FormStyles } from '../../styles/FormStyles';

type CreateAccountProps = {
  isOpen: boolean;
  handleCreateAccount: (userId: number) => void;
  handleClose: () => void;
};
const CreateAccount = ({
  isOpen,
  handleCreateAccount,
  handleClose
}: CreateAccountProps) => {
  const [input, setInput] = useState('');
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
            <h2>Create Account For User</h2>
            <IconButton onClick={handleClose}>
              <CloseIcon className="closeButton"></CloseIcon>
            </IconButton>
          </ModalHeader>

          <FormStyles>
            <TextField
              variant="outlined"
              color="secondary"
              label="Enter User Id"
              placeholder="user@email.com"
              onChange={e => setInput(e.target.value)}
            />
            <ModalFooter>
              <Button
                startIcon={<SaveIcon />}
                onClick={() => handleCreateAccount(Number(input))}
                variant="contained"
                sx={{ width: '100%' }}
              >
                Create Account
              </Button>
            </ModalFooter>
          </FormStyles>
        </ModalContentContainer>
      </Fade>
    </Modal>
  );
};

export default CreateAccount;
