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
                console.log('We have clicked an actve button');
                if (btnNbr === 1 && this.props.onClick[0]) {console.log('clickin'); this.props.onClick[0](); }
                else if (btnNbr === 2 && this.props.onClick[1]) this.props.onClick[1]();
            }
            this.setState({ show: false, internal: true });
            this.handleClose();
        }
    };

    handleClose = () => {
        if (this.props && this.props.onClose) this.props.onClose();
        this.setState({ show: false });
    }

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
            internal: false
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
        return (<Dialog onClose={this.props.onClose} show={this.props.show} onClick={[this.props.onClick]} btn1="Close" header="exclamation-triangle" msg={this.props.msg}></Dialog>);
    }
}

// Example: <YesNo msg="Do you want an answer?" yes="[function when yes is clicked]"  no="[function when no is clicked]"/>
class YesNo extends Dialog {
    render() {
        console.log("YesNo: " + JSON.stringify(this.props) );
        return (<Dialog onClose={this.props.onClose} show={this.props.show} onClick={[this.props.yes, this.props.no]} btn1="Yes" btn2="No" header="question-circle" msg={this.props.msg}></Dialog>);
    }
}

// Example: <OkCancel msg="Do you want to proceed?" ok="[function when OK is clicked]"  cancel="[function when Cancel is clicked]"/>
class OkCancel extends Dialog {
    render() {
        return (<Dialog onClose={this.props.onClose} onClick={[this.props.ok, this.props.cancel]} btn1="OK" btn2="Cancel" header="question-circle" msg={this.props.msg}></Dialog>);
    }
}

/** 
 * Container object that can show any dialog (Simplest way to use modals)
 * <ModalDlg show="MsgBox|Error|YesNo|OkCancel|None" msg="Text to display" btn1=[callback for btn 1] btn2=[callback for btn 2]/>
 * 
 * NOTE: Callback functions are optional
*/
class ModalDlg extends Component {
    constructor() {
        super();
        this.state = { showDialogs: true, ignoreProperties: false };
        this.prevState = {msg:'',show:'', id: -1};
    }

    // Callied from the dialog's "onClose" event
    onClose() {
        return () => {
            this.setState({ ignoreProperties: true });
        }
    }

    // Set the state from the changed properties
    static getDerivedStateFromProps(props, state) {
        // Must hide each dlg view explicitly
        let newState = { showMsgDlg: false, showErrorDlg: false, showOkCancelDlg: false, showYesNoDlg: false };
        let isSame = (props.id === state.id && props.msg === state.msg && props.show === state.show);
        if (!state.ignoreProperties || !isSame) {
            switch (props.show) {
                case 'MsgBox': {
                    newState.showMsgDlg = true;
                    break;
                }
                case 'Error': {
                    newState.showErrorDlg = true;
                    break;
                }
                case 'OkCancel': {
                    newState.showOkCancelDlg = true;
                    break;
                }
                case 'YesNo': {
                    newState.showYesNoDlg = true;
                    break;
                }
                default: {

                }
            }
            newState.msg = props.msg;
            newState.show = props.show;
            newState.id =  props.id;
        }
        newState.ignoreProperties = false;
        return newState;
    }

    shouldComponentUpdate(nextProps, nextState) {
        let isSame = (nextProps.msg === this.prevState.msg && nextProps.show === this.prevState.show && this.prevState.id === nextProps.id);
        let doUpdate = !isSame;
        return doUpdate;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.prevState = prevState;
    }

    render() {
        let clicks = {};
        clicks.btn1 = (this.props.btn1) ? this.props.btn1 : null;
        clicks.btn2 = (this.props.btn2) ? this.props.btn2 : null;
        clicks.btn3 = (this.props.btn3) ? this.props.btn3 : null;
        if (!this.state.showDialogs) return null;
        return (
            <>
                <MsgBox onClose={this.onClose()} show={this.state.showMsgDlg} msg={this.props.msg} />
                <Error onClose={this.onClose()} show={this.state.showErrorDlg} msg={this.props.msg} />
                <OkCancel onClose={this.onClose()} show={this.state.showOkCancelDlg} msg={this.props.msg} ok={clicks.btn1} cancel={clicks.btn2} />
                <YesNo onClose={this.onClose()} show={this.state.showYesNoDlg} msg={this.props.msg} yes={clicks.btn1} no={clicks.btn2} />
            </>
        )
    }
}

// Exports from ./ModalDialogs
export { MsgBox, Error, YesNo, OkCancel }