import React, { Component } from 'react';
import { render } from 'react-dom';
import ConfirmDialog from '../../components/common/confirm-dialog';
import constants from '@spo/config/constants';

let resolve;
const defaultProps = {
    title: 'Xác nhận',
    text: '',
};

class Confirm extends Component {
    static create(props = {}) {
        if (typeof window != 'undefined') {
            const containerElement = document.createElement('div');
            document.body.appendChild(containerElement);
            return render(
                <Confirm createConfirmProps={props} />,
                containerElement,
            );
        } else {
            return null;
        }
    }

    constructor() {
        super();

        this.state = {
            isOpen: false,
            showConfirmProps: {},
        };

        this.handleCancel = this.handleCancel.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.show = this.show.bind(this);
    }

    handleCancel() {
        this.setState({ isOpen: false });
        resolve(false);
    }

    handleConfirm() {
        this.setState({ isOpen: false });
        resolve(true);
    }

    show(props = {}) {
        const showConfirmProps = { ...this.props.createConfirmProps, ...props };
        this.setState({ isOpen: true, showConfirmProps });
        return new Promise((res) => {
            resolve = res;
        });
    }
    render() {
        const { isOpen, showConfirmProps } = this.state;
        const { text, title, mode = constants.CONFIRM_SERVICE.DEFAULT, ...rest } = showConfirmProps;
        return (
            <ConfirmDialog
                text={text || defaultProps.text}
                open={isOpen}
                onConfirm={() => this.handleConfirm()}
                onCancel={() => this.handleCancel()}
                title={title || defaultProps.title}
                mode={mode}
            />
        );
    }
}

export default Confirm.create({});
