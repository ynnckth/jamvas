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
import { initializeTone } from "../../../sequencer/sequencerThunks";
import { useAppDispatch } from "../../../../app/reduxHooks";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../sessionThunks";

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
      await dispatch(registerUser({ name: values.username }));
      await dispatch(initializeTone());
      onClose();
    },
  });

  return (
    <>
      <Button onClick={onOpen}>Join session</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={userRegistrationForm.handleSubmit}>
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
                />
                <FormErrorMessage>{userRegistrationForm.errors.username}</FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button type={"submit"}>Join</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
export default UserRegistrationModal;
