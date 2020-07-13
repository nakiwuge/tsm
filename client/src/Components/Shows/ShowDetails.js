import React, {useEffect, useState} from 'react';
import propTypes from 'prop-types';
import { Spin, Row,Tag,PageHeader,Space,Button, Col,List, Card, Rate} from 'antd';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {Link} from 'react-router-dom'
import {SHOW_FRAGMENT} from '../../Utils/fragments'
import Carousel from '../common/Carousel'
import Schedule from '../WatchList/ScheduleShow';

const GET_SHOW = gql`
  query show($id:ID!){
    show(id:$id){
      ...showFragment 
    }
  }
  ${SHOW_FRAGMENT}
`;

const ShowDetails = ({ match:{params}}) => {
  const { 
    data, 
    loading, 
    error,
    fetchMore
  } = useQuery(GET_SHOW,  { variables: { id:params.id } });
  
  return (
    <div className="show">
   {console.log('show', data)}
    {loading?<Spin className="spinner"  tip="Loading..." size="large" />
      : <>
        {data?.show&& <>
      
      <Row  >
          <Col span={16}>
          <PageHeader
          className="site-page-header"
          onBack={() => window.back()}
          title={`${data.show.name}`}
          subTitle= {<Rate disabled  
          style={{color:"#BE2558"}}
          allowHalf 
          defaultValue={data.show.rating/2} />}
     />
          <div className="summary">
              {data.show.summary.replace(/[</p><b/>]/g,'')}
          </div>
          <Col>
          <Space size="middle">
      <span className="label">
          Genres:{data.show.genres.map((
              item)=>(
              <Tag color="cyan">{item}
              </Tag>))}
    </span>
      <span className="label">Status: <span className="value">{data.show.status}</span></span>
      <span className="label">Premiered Date: <span className="value">{data.show.premiered}</span></span>

      </Space>
          </Col>
    <List
      size="large"
      header={<div>List of Seasons</div>}
      dataSource={data.show.seasons}
      renderItem={item => (
      <List.Item>
          <a href={`${item.url}`}>
          {`Season ${item.number}`}
      </a>
      </List.Item>)}
    />
    <div className="link-button">
    <a  href={data.show.url}><Button> CLick here to watch TV show</Button></a>
        </div>
    <Carousel
    images={data.show.gallery}
    />

          </Col>
          <Col  span={8}>
              <div className="crew">
              <Schedule
              id={params.id}
              >
              <div className="watch-list-btn">
         <Button > Add to Watchlist</Button>
        </div>
              </Schedule>
      
            <h2>Crew Members</h2>

          {data?.show.crew.map((item)=>(
         
            <a href={`${item.url}`}>
            <Card
             hoverable
             cover={<img alt="show" src={item.image} />}
           >
             <Card.Meta 
             title={item.name} 
             description={item.type } 
             />
            </Card>
             </a>
          ))}
          </div>
            </Col>    
 
      </Row>
      </>
      }
      </>
      } 

    </div>
  );
};

export default ShowDetails;
