import { Header, Accordion, Label, Segment, Icon, Button, List, Image } from "semantic-ui-react";
import { useRouter } from "next/router";
import { Fragment } from "react";

const AccountOrders = ({ orders }) => {
  const router = useRouter();

  const mapOrdersToPanels = orders => {
    return orders.map(order => ({
      key: order._id,
      title: {
        content: <Label color='blue' content={order.createdAt} />
      },
      content: {
        content: (
          <>
            <List.Header as='h3'>
              Total: €{order.total}
              <Label
                content={order.email}
                icon='mail'
                basic
                horizontal
                style={{ marginLeft: "1em" }}
              />
            </List.Header>
            <List>
              {order.products.map(p => (
                <List.Item key={p.product._id}>
                  <Image avatar src={p.product.mediaUrl} />
                  <List.Content>
                    <List.Header>{p.product.name}</List.Header>
                    <List.Description>
                      {p.quantity} . €{p.product.price}
                    </List.Description>
                  </List.Content>
                  <List.Content floated='right'>
                    <Label tag color='red' size='tiny'>
                      {p.product.sku}
                    </Label>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </>
        )
      }
    }));
  };

  return (
    <>
      <Header as='h2'>
        <Icon name='folder open' />
        Order History
      </Header>

      {orders.length === 0 ? (
        <Segment inverted tertiary color='grey' textAlign='center'>
          <Header>
            <Icon name='copy outline' />
            No past orders.
          </Header>
          <div>
            <Button color='orange' onClick={() => router.push("/")}>
              View Products
            </Button>
          </div>
        </Segment>
      ) : (
        <Accordion fluid styled exclusive={true} panels={mapOrdersToPanels(orders)} />
      )}
    </>
  );
};

export default AccountOrders;