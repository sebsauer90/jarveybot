import React from 'react';
import Layout from '../components/Layout/Layout';
import Seo from '../components/Seo/Seo';
import Chat from '../components/Chat/Chat';

const IndexPage = () => (
  <Layout>
    <Seo title="Responsive Chatbot Library for React, Vue and vanilla Javascript" />
    <span>@jarveybot</span>
    <h1>Responsive Chatbot Library for React, Vue and vanilla Javascript</h1>
    <p>A chat bot library, which you can use as React component, React hook, Vue component, Vue function composition or, vanilla javascript module.</p>
    <Chat />
  </Layout>
);

export default IndexPage;
