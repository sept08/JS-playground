import React from "react";
import { Button, Input, Switch, Row, Col } from 'antd'
import { default as DatePicker } from '../DatePicker'
import dayjs from 'dayjs'
import './index.css'


class Index extends React.Component{
    constructor() {
        super();
        this.state = {
            type: 0,
            amount: 0,
            category: '',
            time: dayjs(),
        }
    }

    addItem = () => {
        const { addItem } = this.props;
        const { type, time, category, amount } = this.state;
        addItem({ type, time: time.valueOf(), category, amount: parseFloat(amount) })
        this.setState({ category: '', amount: 0 });
    };

    handleType = checked => {
        this.setState({ type: checked ? 1 : 0 })
    };

    changeInput = name => {
        return event => this.setState({ [name]: event.target.value });
    };

    render() {
        const { time, type, amount, category } = this.state;
        return (
            <div>
                <Button type="primary" disabled={!(time && amount && category)} onClick={this.addItem}>添加账单</Button>
                <Input.Group>
                    <Row gutter={2}>
                        <Col span={4}>账单类型：</Col>
                        <Col span={6}>
                            <Switch
                                checkedChildren="收入"
                                unCheckedChildren="支出"
                                defaultChecked
                                checked={!!type}
                                onClick={this.handleType}
                            />
                        </Col>
                    </Row>
                    <Row gutter={2}>
                        <Col span={4}>账单金额：</Col>
                        <Col span={6}>
                            <Input prefix="￥" type="number" value={amount} name="amount" onChange={this.changeInput('amount')} />
                        </Col>
                    </Row>
                    <Row gutter={2}>
                        <Col span={4}>账单分类：</Col>
                        <Col span={6}>
                            <Input value={category} onChange={this.changeInput('category')} />
                        </Col>
                    </Row>
                    <Row gutter={2}>
                        <Col span={4}>账单日期：</Col>
                        <Col span={6}>
                            <DatePicker value={time} onChange={this.changeInput('time')}/>
                        </Col>
                    </Row>
                </Input.Group>
            </div>
        );
    }

}

export default Index;
