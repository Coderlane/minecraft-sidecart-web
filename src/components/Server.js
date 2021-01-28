import React from 'react';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';

function Server(props) {
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
Server.propTypes = {
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

export default Server;
