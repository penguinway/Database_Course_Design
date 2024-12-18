import React from "react";
import { Link } from 'react-router-dom';
import { Result, Button } from "antd";


const Error: React.FC = () => {
    return (
        <Result
        status="404"
        title="404"
        subTitle="对不起，您访问的页面不存在。"
        extra={
            <Link to="/">
            <Button type="primary" className="btn btn-primary">返回首页</Button>
            </Link>
        }
        />
    );
};

export default Error;