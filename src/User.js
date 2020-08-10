import React from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { gql } from 'apollo-boost';

const QUERY_URLS = gql`
query {
    urls {
      id
      fullUrl
      urlHash
      clicks
      createdAt
    }
  }
`;
export function UrlInfo() {
  // Polling: provides near-real-time synchronization with
  // your server by causing a query to execute periodically
  // at a specified interval
  const { data, loading } = useQuery(
    QUERY_URLS, {
      pollInterval: 500 // refetch the result every 0.5 second
    }
  );
  
  // should handle loading status
  if (loading) return <p>Loading...</p>;
  return data.urls.map(({ id, fullUrl, urlHash}) => (
    <div key={id}>
      <p>
        {id}: <a target="_blank" href={'http://localhost:8000/' + urlHash}>http://localhost:8000/{urlHash}</a> - {fullUrl}
      </p>
    </div>
  ));
}
const CREATE_URL = gql`
mutation createUrl($url: String!){
  createUrl (fullUrl: $url) {
    url {
      id
      fullUrl
      urlHash
      clicks
      createdAt
    }
  }
}
`;
export function CreateUrl() {
  let inputURL;
  // eslint-disable-next-line
  const [createUrl, { data }  ] = useMutation(CREATE_URL);
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          createUrl({ variables: {
            url: inputURL.value,
        } });
        inputURL.value = '';
        window.location.reload();
      }}
      style = {{ marginTop: '2em', marginBottom: '2em' }}
     >
     <label>URL: </label>
     <input
       ref={node => {
         inputURL = node;
       }}
       style={{ marginRight: '1em' }}
     />
     
     <button type="submit" style={{ cursor: 'pointer' }}>Crisp It!</button>
    </form>
   </div>
  );}