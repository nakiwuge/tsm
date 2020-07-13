import React, {useEffect, useState} from 'react';
import { Spin, Row,Pagination,Carousel, Col, Card, Rate} from 'antd';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {Link} from 'react-router-dom'
import {SHOW_FRAGMENT} from '../../Utils/fragments'

const GET_SHOWS = gql`
  query shows{
    shows {
      ...showFragment 
    }
  }
  ${SHOW_FRAGMENT}
`;

const Shows = () => {
  const { 
    data, 
    loading, 
    error,
    fetchMore
  } = useQuery(GET_SHOWS);

  return (
    <div className="shows">
     <h1>TV Shows</h1>
    {loading?<Spin className="spinner"  tip="Loading..." size="large" />
      :<Row justify="center" >
        {data?.shows.map((item)=>(
          <Col key={item.id}span={4}>
             <Link to={`/show/${item.id}`}>
             <Card
              hoverable
              cover={<img alt="show" src={item.image} />}
            >
              <Card.Meta 
              title={item.name} 
              description={
                <Rate disabled  
                style={{color:"#BE2558"}}
                allowHalf 
                defaultValue={item.rating/2} />
              } />
            </Card>
          </Link>    
          </Col>
        ))
        } 
      </Row>
      } 
    </div>
  );
};

export default Shows;
