import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { userProfile } from '../services/UserService/UserService';
import { Container, Row, Col, Image } from 'react-bootstrap';

const Account = () => {
  const { userid } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(userid);
        const response = await userProfile(userid);
        console.log(response.user);
        setUser(response.user[0]);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchData();
  }, [userid]);

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        {/* <Col md={4}>
          {user && <Image src={user.photoUrl} alt={user.username} fluid rounded />}
        </Col> */}
        <Col md={8}>
          <h2 className="text-primary">{user ? user.username : 'Loading...'}</h2>
          <p className="mb-0"><strong>Email:</strong> {user ? user.email : ''}</p>
          <p className="mb-0"><strong>Address:</strong> {user ? user.address : ''}</p>
          <p><strong>Phone:</strong> {user ? user.phone : ''}</p>
        </Col>
      </Row>
      <h3 className="text-primary mb-4">Additional Information</h3>
      <Row>
        <Col md={3}>
          <strong>Age:</strong>
        </Col>
        <Col md={9}>
          <p>{user ? user.age : ''}</p>
        </Col>
      </Row>
      <Row>
        <Col md={3}>
          <strong>Interests:</strong>
        </Col>
        <Col md={9}>
          {/* <p>{user ? user.interests.join(',') : ''}</p> */}
        </Col>
      </Row>
      {/* Add more rows for additional information */}
    </Container>
  );
};

export default Account;
