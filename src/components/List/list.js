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
        return this.props.data.map((item, i) => {
            return (
                <li key={i}>{item.text}</li>
            );
        });
    }
    render() {
        let liHtml = this._renderItms();
        return (
            <ul>{liHtml}</ul>
        );
    }
}

List.propTypes = {
    data: React.PropTypes.array
};

export default List;
