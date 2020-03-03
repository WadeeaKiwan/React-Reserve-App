import React from "react";
import { Header, Button, Modal } from "semantic-ui-react";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import { useRouter, NextRouter } from "next/router";

import { IUser } from "../../models/User";

const ProductAttributes = ({
  description,
  _id,
  user
}: {
  description: string;
  _id: string;
  user: IUser;
}) => {
  const [modal, setModal] = React.useState(false);
  const router: NextRouter = useRouter();

  const isRoot: boolean = user && user.role === "root";
  const isAdmin: boolean = user && user.role === "admin";
  const isRootOrAdmin: boolean = isRoot || isAdmin;

  const handleDelete = async (): Promise<void> => {
    const url: string = `${baseUrl}/api/product`;
    const payload: { params: { _id: string } } = { params: { _id } };
    await axios.delete(url, payload);
    router.push("/");
  };

  return (
    <>
      <Header as='h3'>About this product</Header>
      <p>{description}</p>

      {isRootOrAdmin && (
        <>
          <Button
            icon='trash alternate outline'
            color='red'
            content='Delete Product'
            onClick={() => setModal(true)}
          />
          <Modal open={modal} dimmer='blurring'>
            <Modal.Header>Confirm Delete</Modal.Header>
            <Modal.Content>
              <p>Are you sure you want to delete this product?</p>
            </Modal.Content>
            <Modal.Actions>
              <Button content='Cancel' onClick={() => setModal(false)} />
              <Button
                negative
                icon='trash'
                labelPosition='right'
                content='Delete'
                onClick={handleDelete}
              />
            </Modal.Actions>
          </Modal>
        </>
      )}
    </>
  );
};

export default ProductAttributes;
