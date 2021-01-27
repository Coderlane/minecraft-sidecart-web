import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Media from 'react-bootstrap/Media';
import ListGroup from 'react-bootstrap/ListGroup';

import Header from '../components/Header';
import { db } from '../services/firebase';
import { UserContext } from '../components/UserContext';

function ServerNavLink(props) {
  const { id, server } = props;

  return (
    <Nav.Link key={id} eventKey={id}>
      <Media>
        <Image src={server.info.icon} />
        <Media.Body>
          <h5>{server.name}</h5>
          <p>
            Players:
            {' '}
            {server.info.online_players}
            {' '}
            /
            {' '}
            {server.info.max_players}
          </p>
        </Media.Body>
      </Media>
    </Nav.Link>
  );
}
ServerNavLink.propTypes = {
  id: PropTypes.string.isRequired,
  server: PropTypes.shape({
    name: PropTypes.string.isRequired,
    info: PropTypes.shape({
      icon: PropTypes.string,
      online: PropTypes.bool.isRequired,
      online_players: PropTypes.number.isRequired,
      max_players: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

function ServerDetails(props) {
  const { server } = props;

  return (
    <Container>
      <h1>{server.name}</h1>
      <Row>
        <Col>
          <h3>Online Players</h3>
          <ListGroup>
            {Array.isArray(server.info.players)
             && server.info.players.map((player) => (
               <ListGroup.Item key={player.uuid}>{player.name}</ListGroup.Item>
             ))}
          </ListGroup>
        </Col>
        <Col />
      </Row>
    </Container>
  );
}
ServerDetails.propTypes = {
  server: PropTypes.shape({
    name: PropTypes.string.isRequired,
    info: PropTypes.shape({
      icon: PropTypes.string,
      online: PropTypes.bool.isRequired,
      online_players: PropTypes.number.isRequired,
      max_players: PropTypes.number.isRequired,
      players: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        uuid: PropTypes.string.isRequired,
      })),
    }),
  }).isRequired,
};

function Servers() {
  const [servers, setServers] = useState(null);
  const [serverID, setServerID] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const unsubscribe = db.collection('servers')
      .where('owners', 'array-contains', user.uid)
      .onSnapshot((querySnapshot) => {
        const queryServers = new Map();
        querySnapshot.forEach((server) => {
          queryServers.set(server.id, server.data());
        });
        if (serverID === null) {
          setServerID(Array.from(queryServers.keys())[0]);
        }
        setServers(queryServers);
      });
    return () => {
      unsubscribe();
    };
  }, []);

  if (servers === null) {
    return (
      </* TODO: Display a loading state. */>
        <Header />
      </>
    );
  }

  if (servers.size === 0) {
    return (
      </* TODO: Include instructions on how to setup the daemon. */>
        <Header />
        <h3>Setup Minecraft Sidecart</h3>
      </>
    );
  }

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col>
            <Nav
              variant="pills"
              className="flex-column"
              activeKey={serverID}
              onSelect={(selectedKey) => (setServerID(selectedKey))}
            >
              {Array.from(servers, ([id, server]) => (
                <ServerNavLink key={id} id={id} server={server} />
              ))}
            </Nav>
          </Col>
          <Col>
            <ServerDetails server={servers.get(serverID)} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Servers;
