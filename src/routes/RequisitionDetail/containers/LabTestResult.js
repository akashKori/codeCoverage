import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { LoadLabResult } from '../modules/labTestResultAction';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';

import CircularProgress from 'material-ui/CircularProgress';
import { List, ListItem } from 'material-ui/List';


import './LabTestResult.scss';
class LabTestResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
        this.collapseButton = this.collapseButton.bind(this);
    }
    state = {
        open: false,
    };

    collapseButton = () => {
        this.setState({
            open: this.state.open,
        });

    }

    handleToggle = () => {
        this.setState({
            open: !this.state.open,
        });
    };

    handleNestedListToggle = (item) => {
        this.setState({
            open: item.state.open,
        });
    };

    componentWillMount() {
        var self = this;
        setTimeout(() => {
            self.setState({ loading: false });
        }, 9999);

        const SelectedUserId = this.props.selectedVisitId;
        this.props.loadResult(SelectedUserId);
    }

    renderList() {
        if (this.props.labresults && this.props.labresults.length) {
            return this.props.labresults.map((test, index) => {
                return (
                    <div key={index}>
                        <List key={test.TestId} style={{ padding:0, margin:0,  }}>
                            <ListItem  initiallyOpen={true} open={this.state.open}
                                onNestedListToggle={this.handleNestedListToggle} primaryTogglesNestedList={true} innerDivStyle={{ padding:'18px 10px 10px  50px', fontSize:'14px'}}
                                primaryText={test.TestName} leftCheckbox={<Checkbox />} 
                                nestedItems={[
                                    <ListItem open={this.state.open} key={test.LabResultList} innerDivStyle={{ backgroundColor:'#FFF', padding:0, margin:'0px 15px',fontSize:'14px'}}>
                                        <div className='labview'>
                                            {test.LabResultList.map((result, i) => {
                                                return (
                                                    <div key={i} >
                                                        <div className='clearfix'>
                                                            <IconButton tooltip="Edit" style={{float:'left', padding: 5, width: 40, height: 30,}}>
                                                                <EditorModeEdit />
                                                            </IconButton>
                                                            <p className='labview__text'> {result.ResultName} &nbsp;</p>
                                                        </div>
                                                        <div className='clearfix'>
                                                            <IconButton tooltip="Note" style={{float:'left', padding:5, height:30, width:40}}>
                                                                <ActionNoteAdd />
                                                            </IconButton>
                                                            <p className='labview__text'> <b>Status: </b> {result.Status} &nbsp;</p>
                                                            <p className='labview__text'>   {result.ResultValue} {result.ResultUOM} </p>
                                                        </div>
                                                        <div className='clearfix'>
                                                            <Checkbox className='labview__status-change' />
                                                            <span className='labview__status-text'>Select to Redraw, Rerun, or Change status</span>
                                                        </div>
                                                        <div className='labview__border'> </div>
                                                    </div>
                                                )
                                            })}

                                        </div>
                                    </ListItem>
                                ]}>
                            </ListItem>
                        </List>

                    </div>


                );
            });
        }
        else {
            return (

                <div key='busyIndicator' className='busy-indicator'>
                    <div className='busy-indicator__spinner'>
                        <CircularProgress size={40} thickness={5} />
                    </div>
                </div>

            );
        }

    }
    render() {
        return (
            <div>
                <div className='clearfix' />
                {this.renderList()}
            </div>

        );
    }

}
// Get apps state and pass it as props to UserList
// > whenever state changes, the UserList will automatically re-render
function mapStateToProps(store) {
    return {
        labresults: store.reqDetail.labresult.labresult,
        selectedVisitId: store.requisition.selectedVisitId

    };
}

const matchDispatchToProps = (dispatch) => ({
    loadResult: (selectedUserId) => dispatch(LoadLabResult(selectedUserId))

});

LabTestResult.propTypes = {
    selectedVisitId: React.PropTypes.string.isRequired
}
export default connect(mapStateToProps, matchDispatchToProps)(LabTestResult);

