import './_list';
import React from 'react';
import BaseComponent from '../../base-component';

class List extends BaseComponent {
    constructor(props) {
        super(props);
        this._bind(
            '_renderItms'
        );
    }
    _renderItms() {
        console.log('************', this.props.data);
        return this.props.data.map((item, i) => {
            console.log('123', item);
            return (
                <li key={i}></li>
            );
        });
    }
    render() {
        const {data} = this.props;
        console.log('---**', data);

        let liHtml = this._renderItms();

        // let items = this._renderItms();
        // console.log(items);

        return (
            <ul>{liHtml}</ul>
        );
    }
}

List.propTypes = {
    data: React.PropTypes.object
};

export default List;
