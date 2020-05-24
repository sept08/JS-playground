import React from 'react';
import { message } from 'antd';
import { parseCsv } from './utils/csv';
import List from './component/list';
import Add from './component/add';
import './App.css';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            bill: [],
            categoryMap: {},
        }
    }

  componentDidMount() {
        Promise.all([
            parseCsv('./bill.csv'),
            parseCsv('./categories.csv'),
        ]).then(([bill, category]) => {
            // 分类映射
            const categoryMap = {};
            category.forEach(item => categoryMap[item.id] = item.name);
            // 格式化bill
            const billList = bill.map(item => ({
                ...item,
                type: parseInt(item.type),
                time: Number(item.time),
                amount: parseFloat(item.amount),
            }));
            this.setState({ bill: billList, categoryMap })
        })
  }

  addItem = data => {
        const { bill, categoryMap } = this.state;
        // 添加账单项
        const newBill = bill.slice()
        newBill.push({
            type: data.type,
            time: data.time,
            amount: data.amount * 100,
            category: data.category,
        });
        if (Object.values(categoryMap).indexOf(data.category) >= 0) {
            this.setState({ bill: newBill });
        } else {
            this.setState({ bill: newBill, categoryMap: { ...categoryMap, [data.category]: data.category }})
        }
        message.success('成功添加一条记录');
  };

  render() {
        const { bill, categoryMap } = this.state;
        return (
          <div className="App">
            <List bill={bill} category={categoryMap} />
            <Add addItem={this.addItem} />
          </div>
        );
  }
}

export default App;
