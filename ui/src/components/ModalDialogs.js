import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class Dialog extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            show: false,
            internal: true
        };
    }

    // Handle onClick, onClick1, and onClick2 events
    handleClick(btnNbr) {
        return () => {
            if (this.props.onClick && this.props.onClick[0]) {
                if (btnNbr === 1 && this.props.onClick.length > 0) this.props.onClick[0]();
                else if (btnNbr === 2 && this.props.onClick.length > 1) this.props.onClick[1]();
            }
            this.setState({ show: false, internal: true });
            this.handleClose();
        }
    };
    handleClose() { this.props.onClose(); }

    // Externally accessible functions to show or hide the active dialog
    showDialog = () => this.setState({ show: true });
    hideDialog = () => this.setState({ show: false });

    static getDerivedStateFromProps(props, state) {
        if (props.show !== state.show && !state.internal) {
            return {
                show: props.show
            };
        }
        return {
            internal:false
        }
    }

    render() {
        let headerIcon = (this.props.header) ? this.props.header : "info-circle";
        let faIcon = "fa fa-" + headerIcon;
        let btn1Text = (this.props.btn1) ? this.props.btn1 : "";
        let btn2Text = (this.props.btn2) ? this.props.btn2 : "";
        let btn1 = <Button onClick={this.handleClick(1)} className="btn">{btn1Text}</Button>;
        let btn2 = <Button onClick={this.handleClick(2)} className="btn btn-warning">{btn2Text}</Button>;
        let buttons = (this.props.btn2) ? <>{btn1}{btn2}</> : <span>{btn1}</span>;
        return (
            <>
                <Modal
                    {...this.props}
                    show={this.state.show}
                    onHide={this.handleClose}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered="true"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <i className={faIcon}></i>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{this.props.msg}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        {buttons}
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

/**
 * Some commonly used types of dialogs (message box, error, yes or no, ok or cancel)
 * NOTE: All handlers are optional (onClick, yes, no, ok, cancel)
 */

// Example: <MsgBox msg="Hello World" onClick="[function when OK is clicked]/>"
class MsgBox extends Dialog {
    render() {
        return (<Dialog onClose={this.props.onClose} show={this.props.show} onClick={[this.props.onClick]} btn1="OK" header="info-circle" msg={this.props.msg}></Dialog>);
    }
}

// Example: <Error msg="Hello World" onClick="[function when Close is clicked]/>"
class Error extends Dialog {
    render() {
        return (<Dialog show={this.props.show} onClick={[this.props.onClick]} btn1="Close" header="exclamation-triangle" msg={this.props.msg}></Dialog>);
    }
}

// Example: <YesNo msg="Do you want an answer?" yes="[function when yes is clicked]"  no="[function when no is clicked]"/>
class YesNo extends Dialog {
    render() {
        return (<Dialog show={this.props.show} onClick={[this.props.yes, this.props.no]} btn1="Yes" btn2="No" header="question-circle" msg={this.props.msg}></Dialog>);
    }
}

// Example: <OkCancel msg="Do you want to proceed?" ok="[function when OK is clicked]"  cancel="[function when Cancel is clicked]"/>
class OkCancel extends Dialog {
    render() {
        return (<Dialog onClick={[this.props.ok, this.props.cancel]} btn1="OK" btn2="Cancel" header="question-circle" msg={this.props.msg}></Dialog>);
    }
}

// Exports from ./ModalDialogs
export { MsgBox, Error, YesNo, OkCancel }