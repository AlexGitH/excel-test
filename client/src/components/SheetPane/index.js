import 'antd/dist/antd.css';
import './style.css'
import React from 'react'
import { Tabs } from 'antd';
import UserInfo from '../UserInfo';
import EditableTable from '../EditableTable';

const { TabPane } = Tabs;

const initialPanes = [
  ...Array.from({length:3}, (x,i)=>( x=i+1,{title: `Sheet ${x}`,content: `Content of Sheet ${x}`, key: `${x}`}) ),
  // ...Array(30).fill(0).map((x,i)=>( x=i+1,{title: `Sheet ${x}`,content: `Content of Sheet ${x}`, key: `${x}`})),
  {
    title: 'Sheet N',
    content:'Content of Sheet N',
    key: '3000',
    closable: false,
  },
];

// TODO: rewrite to react-component

class SheetPane extends React.Component {
  newTabIndex = 0;

  state = {
    activeKey: initialPanes[0].key,
    panes: initialPanes,
  };

  onChange = activeKey => {
    this.setState({ activeKey });
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  add = () => {
    const { panes } = this.state;
    const activeKey = `newTab${this.newTabIndex++}`;
    const newPanes = [...panes];
    newPanes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey });
    this.setState({
      panes: newPanes,
      activeKey,
    });
  };

  remove = targetKey => {
    const { panes, activeKey } = this.state;
    let newActiveKey = activeKey;
    let lastIndex;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = panes.filter(pane => pane.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    this.setState({
      panes: newPanes,
      activeKey: newActiveKey,
    });
  };

  render() {
    const { panes, activeKey } = this.state;
    return (
      <Tabs
        // tabBarExtraContent={
        //   <UserInfo />
        // }
        tabPosition="bottom"
        type="editable-card"
        onChange={this.onChange}
        activeKey={activeKey}
        onEdit={this.onEdit}
      >
        {panes.map(pane => (
          <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
            {/* // <div style={{display: 'flex', flexWrap: 'wrap', overflowX:'scroll'}} > */}
              {/* { Array(300).fill(0).map((x,i)=>(<input key={i} value={pane.content}/>)) } */}
              <EditableTable  key={`tab-${pane.key}`} />

              {/* <input value={pane.content}/> */}
{/* <button  >{pane.content}</button> */}
            {/* // </div> */}
            {/* {pane.content} */}
          </TabPane>
        ))}
      </Tabs>
    );
  }
}

export default SheetPane
