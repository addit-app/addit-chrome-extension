import React from 'react'
import {
  HashRouter,
  NavLink,
} from 'react-router-dom'
import {
  Avatar,
  Icon,
  Layout,
  Menu,
  message,
  // Tag,
  Tooltip,
} from 'antd'
import Sidebar from 'react-sidebar'
import Clipboard from 'react-clipboard.js'
import {
  Div,
} from 'glamorous'
import styled from 'styled-components'
import Header from './layouts/Header'
import './assets/css/layout.less'
import IndexRouter from './routes/IndexRouter'

const {
  Content,
} = Layout

const UpperDiv = styled.div`
  margin-bottom: 10px;
`

const BottomBtn = styled.div`
  bottom: 0;
  position: absolute;
  width: 100%;
  text-align: center;
  height: 44px;
}
`

// const EllipsisTag = styled(Tag)`
//   overflow: hidden;
//   text-overflow: ellipsis;
//   width: fit-content;
//   max-width: 160px;
// `

const TitleIcon = styled(Icon)`
  margin-right: 10px;
`

const sidebar = (
  <Div>
    <Div
      textAlign='center'
      padding='20px'
    >
      <Avatar
        shape='square'
        size={64}
        icon='user'
        // style={{
        //   color: '#faad14', // gold-2
        //   background: '#fff1b8', // gold-6
        // }}
      />
      <UpperDiv style={{ marginTop: '10px' }}>
        <b>channprj</b>
      </UpperDiv>
      <UpperDiv>
        1000 KLAY
      </UpperDiv>
      <div>
        <Tooltip placement='top' title='Copy address'>
          <Clipboard
            key='1'
            component='span'
            data-clipboard-text='0x58BEa8bD7938be0d87B2B235920BDeC828225c5e'
            onSuccess={() => message.success('Copied!', 1.5)}
          >
            {/* <EllipsisTag>0x58BEa8bD7938be0d87B2B235920BDeC828225c5e</EllipsisTag> */}
          </Clipboard>
        </Tooltip>
      </div>
    </Div>
    <Menu
      mode='inline'
      defaultSelectedKeys={[window.location.href.split('#')[1]]}
    >
      <Menu.Item key='/feed'>
        <NavLink to='/feed'>
          <Icon type='message' theme='outlined' />
          <span>Comments</span>
        </NavLink>
      </Menu.Item>
      <Menu.Item key='/wallet'>
        <NavLink to='/wallet'>
          <Icon type='wallet' theme='outlined' />
          <span>Wallet</span>
        </NavLink>
      </Menu.Item>
      <Menu.Item key='/settings'>
        <NavLink to='/settings'>
          <Icon type='tool' />
          <span>Settings</span>
        </NavLink>
      </Menu.Item>
    </Menu>
    <BottomBtn>
      <a id='open-newtab' href={window.location.href} target='_blank' rel='noopener noreferrer'>
        <TitleIcon type='export' theme='outlined' />
        <span>Open in a new tab</span>
      </a>
    </BottomBtn>
  </Div>
)

const mql = window.matchMedia('(min-width: 576px)')

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      open: false,
      docked: mql.matches,
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize.bind(this));
    this.resize();
  }

  toggleSidebar = () => {
    const isOpen = this.state.open
    this.setState({
      open: !isOpen,
    })
  }

  resize = () => {
    if (window.innerWidth <= 576) {
      this.setState({
        open: false,
        docked: false,
      })
    }
    if (window.innerWidth >= 1200) {
      this.setState({
        open: false,
        docked: true,
      })
    }
  }

  render() {
    localStorage.setItem('nickname', 'channprj')
    localStorage.setItem('address', '0x58BEa8bD7938be0d87B2B235920BDeC828225c5e')
    localStorage.setItem('privateKey', 'channprj')
    return (
      <HashRouter>
        <Layout
          style={{
            minHeight: '100vh',
          }}
        >
          <Sidebar
            sidebar={sidebar}
            open={this.state.open}
            onSetOpen={this.toggleSidebar}
            docked={this.state.docked}
            styles={{
              sidebar: {
                background: 'white',
                width: '220px',
              },
            }}
          >
            <Header
              open={this.state.open}
              toggle={this.toggleSidebar}
            />
            <Content>
              <IndexRouter />
            </Content>
          </Sidebar>
        </Layout>
      </HashRouter>
    )
  }
}

export default App
