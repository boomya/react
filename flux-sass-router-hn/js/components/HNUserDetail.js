import React from 'react';

var HNUserDetail = React.createClass({
    componentDidMount: function(){
        console.log("HNUserDetail compoentDidMount");
    },
    componentWillUnmount: function(){
        console.log("HNUserDetail componentWillUnmount");
    },
    render: function () {
        console.log(this.props);
        return (
            <div className="box-container ">
                <div className="box-item layout-box-border main">
                    <div className="main-item">
                        <div className="main-item-seq">
                            1
                        </div>
                        <div className="main-item-content">
                            <div>{this.props.params.id}</div>
                            <div className="desc">HNUserDetail</div>
                        </div>
                    </div>
                    <div className="main-item">
                        <div className="main-item-seq">
                            2
                        </div>
                        <div className="main-item-content">
                            <div>111111111</div>
                            <div className="desc">2222222</div>
                        </div>
                    </div>
                    <div className="main-item">
                        <div className="main-item-seq">
                            3
                        </div>
                        <div className="main-item-content">
                            <div>111111111</div>
                            <div className="desc">2222222</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = HNUserDetail;

