import React from 'react';
import Layout from 'antd/lib/layout';
import './SiteLayout.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import GagsList from '../GagsList';
import GagPage from '../GagPage'; 
import HeaderContent from '../Header'

const { Header, Content, Footer } = Layout;

class SiteLayout extends React.Component {
  render() {
    return (
      <Router>
        <Layout className="layout">
          <Header className='header-wrapper'>
            <HeaderContent/>
          </Header>
          <Content className='content-wrapper'>
            <Switch>
              <Route exact path='/'
                component={()=>(<GagsList/>)}/>
              <Route path='/gag/:id'
                component={GagPage}/>                
            </Switch>
          </Content>
          <Footer className='footer'>
            © nit 2008 - 2017. All Rights Reserved
          </Footer>
        </Layout>
      </Router>
    );
  }
}

export default SiteLayout;
