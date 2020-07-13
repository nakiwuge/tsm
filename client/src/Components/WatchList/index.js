import React from 'react';
import { Spin, Row,Pagination,message, Col, Card, Rate} from 'antd';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {Link} from 'react-router-dom'
import {SHOW_FRAGMENT} from '../../Utils/fragments'

const GET_WATCHLIST = gql`
  query scheduled{
    scheduledShows {
      ...showFragment 
    }
  }
  ${SHOW_FRAGMENT}
`;

const Watchlist = () => {
  const { 
    data, 
    loading, 
    error,
    fetchMore
  } = useQuery(GET_WATCHLIST);


if(error){
  return message.error(error.message)
} 

  return (
    <div className="shows">
     <h1>Your Watchlist</h1>
    {loading?<Spin className="spinner"  tip="Loading..." size="large" />
      :<Row justify="center" >
        {data?.scheduledShows.map((item)=>(
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

export default Watchlist;
