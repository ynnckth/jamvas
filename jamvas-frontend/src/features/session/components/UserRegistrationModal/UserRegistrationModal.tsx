import React from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { getSequencerConfiguration, initializeTone } from "../../../sequencer/sequencerThunks";
import { useAppDispatch } from "../../../../app/reduxHooks";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getAllUsers, registerUser } from "../../sessionThunks";
import { testId } from "../../../../testing/testId";

const UserRegistrationModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const userRegistrationForm = useFormik({
    initialValues: {
      username: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().max(15, "Must be 15 characters or less").required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        await dispatch(registerUser({ name: values.username })).unwrap();
      } catch (e) {
        onClose();
        return;
      }
      await Promise.all([dispatch(getAllUsers()), dispatch(getSequencerConfiguration()), dispatch(initializeTone())]);
      onClose();
    },
  });

  return (
    <>
      <Button onClick={onOpen} data-testid={testId.joinSessionButton}>
        Join session
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={userRegistrationForm.handleSubmit} data-testid={testId.userRegistrationModalContainer}>
            <ModalHeader>Join the Session</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isInvalid={!!userRegistrationForm.errors.username}>
                <FormLabel>Nickname</FormLabel>
                <Input
                  placeholder="Superman"
                  name="username"
                  defaultValue={userRegistrationForm.initialValues.username}
                  onChange={userRegistrationForm.handleChange}
                  data-testid={testId.usernameInputField}
                />
                <FormErrorMessage>{userRegistrationForm.errors.username}</FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button type={"submit"} data-testid={testId.confirmJoinButton}>
                Join
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
export default UserRegistrationModal;
