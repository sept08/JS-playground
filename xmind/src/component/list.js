import React from "react";
import { Table } from 'antd';
import dayjs from 'dayjs'

function reduceSum(arr, type = 0) {
    return  arr.filter(e => e.type === type)
        .map(e => e.amount)
        .reduce((total, item) => total + item, 0);
}

class List extends React.Component {
    constructor() {
        super();
        this.state = {
            totalOut: 0,
            totalIn: 0,
            filteredInfo: null,
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            const { bill } = this.props;
            const totalOut = reduceSum(bill);
            const totalIn = reduceSum(bill, 1);
            this.setState({ totalOut, totalIn, filteredInfo: null });
        }
    }

    getFilterForTime = () => {
        const months = new Array(12)
            .fill(1)
            .map((item, index) => ({ text: `${index + 1}月`, value: index + 1}));
        return {
            filters: months,
            onFilter: (value, record) => {
                return dayjs(Number(record.time)).month() + 1 === value
            },
        }
    };

    // 分类过滤
    getFilterForCategory = () => {
        const { category } = this.props;
        const filters = Object.keys(category).map(item => ({ text: category[item], value: item }));
        return {
            filters,
            onFilter: (value, record) => record.category.indexOf(value) === 0,
        }
    };

    changeTable = (pagination, filters, sorter, extra) => {
        const totalOut = reduceSum(extra.currentDataSource);
        const totalIn = reduceSum(extra.currentDataSource, 1);
        this.setState({ totalOut, totalIn, filteredInfo: filters });
    };

    render() {
        const self = this;
        let { totalOut, totalIn, filteredInfo }  = this.state;
        filteredInfo = filteredInfo || {};
        const columns = [
            {
                title: '账单类型',
                dataIndex: 'type',
                key: 'type',
                width: '20%',
                render: function(text) {
                    return text === 0 ? '支出' : '收入';
                },
            },
            {
                title: '时间',
                dataIndex: 'time',
                key: 'time',
                width: '30%',
                filteredInfo: filteredInfo.time || null,
                render: function (text) {
                    return dayjs(text).format('YYYY-MM-DD')
                },
                ...this.getFilterForTime(),
            },
            {
                title: '分类',
                dataIndex: 'category',
                key: 'category',
                filteredInfo: filteredInfo.category || null,
                render: function(text) {
                    return self.props.category[text];
                },
                ...this.getFilterForCategory(),
            },
            {
                title: '金额',
                dataIndex: 'amount',
                key: 'amount',
                sorter: (rowA, rowB) => rowA.amount - rowB.amount,
                render: function (text) {
                    return `￥${text}`;
                }
            },
        ];
        return <Table
            columns={columns}
            rowKey='time'
            dataSource={this.props.bill}
            onChange={this.changeTable}
            footer={() => `当前总收入：￥${totalIn}, 当前总支出：￥${totalOut}`}
        />;
    }
}

export default List;
