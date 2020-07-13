import React from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { message, Popconfirm } from 'antd';

export const SCHEDULE = gql`
  mutation shedule($showId: ID!) {
    addToWatchlist(showId:$showId){
        showId
        success
        
      }
  }
`;

const Schedule = ({
  children,
  id
}) => {

  const [addToWatchlist, { loading }] = useMutation(
    SCHEDULE,
    {
      onCompleted({ addToWatchlist }) {
        const {error, success}=addToWatchlist;
        if(error){
          return message.error(error);
        }
        if(success){
          return message.success('The Show has beed added to your whatchlist');
        }
      }
    }
  );

  const  confirm=(e)=> {

    addToWatchlist({ variables: { showId:id} });

  };

  return (
    <div>
      <Popconfirm
        title="Are you sure?"
        onConfirm={confirm}
        // onCancel={cancel}
        okText="Yes"
        cancelText="No"
        loading={loading}
      >
        {children}
      </Popconfirm>,
    </div>
  );
};

export default Schedule;
