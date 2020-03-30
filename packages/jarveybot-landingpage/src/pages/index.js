import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Chat from '../components/Chat/Chat';

const IndexPage = () => (
  <Layout>
    <SEO title="Chat" />
    <h1>Chat</h1>
    <Chat />
  </Layout>
)

export default IndexPage
