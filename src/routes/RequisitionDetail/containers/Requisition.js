import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import {LoadRequistion} from '../modules/requisitionAction';
import CircularProgress from 'material-ui/CircularProgress';
class Requisition extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fixedHeader: true,
            fixedFooter: true,
            stripedRows: false,
            showRowHover: false,
            selectable: true,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: false,
           loading: true,
        };
    }
    componentWillMount() {
       const SelectedUserId=this.props.selectedVisitId;
     this.props.loadRequistion(SelectedUserId);
      }
    renderList() {
         if(this.props.requisitionTab  && this.props.requisitionTab.length){
           return this.props.requisitionTab.map((req) => {
            return (
                <div key={req.LabOrderId}>
                    <h5>LIS Accession Number :{req.AccessionNumber} </h5>
                    <h5>Lab Order ID :{req.LabOrderId}</h5>
                    <div> {req.TestName}</div>
                    <Table>
                        <TableHeader displaySelectAll={this.state.showCheckboxes}
                            adjustForCheckbox={this.state.showCheckboxes}
                            enableSelectAll={this.state.enableSelectAll}>
                            <TableRow>
                                <TableHeaderColumn>Clinician</TableHeaderColumn>
                                <TableHeaderColumn>Dates</TableHeaderColumn>
                                <TableHeaderColumn>Order Source</TableHeaderColumn>
                                <TableHeaderColumn>Test</TableHeaderColumn>
                                <TableHeaderColumn>Transcriptionist</TableHeaderColumn>
                            </TableRow> 
                        </TableHeader>
                        <TableBody displayRowCheckbox={this.state.showCheckboxes}>
                            <TableRow>
                                <TableRowColumn > <p>{req.ClinicianName} </p>
                                                   <p>NPI:{req.NPI},<br/>Theranos,</p>
                                                   <p> Ph:{req.PhoneNumber}</p>
                                                </TableRowColumn>
                                <TableRowColumn>Order Effective: {req.OrderEffectiveDate}</TableRowColumn>
                                <TableRowColumn>LIS</TableRowColumn>
                                <TableRowColumn>{req.TestName}</TableRowColumn>
                                <TableRowColumn>Labdirector Theranos</TableRowColumn>
                            </TableRow>

                        </TableBody>
                    </Table>
                </div>
            );
         });
        }
        else{
            return (
                <div className='busy-indicator'>
                    <div className='busy-indicator__spinner'>
                        <CircularProgress size={40} thickness={5} />
                    </div>
                </div>
                );
        }
    }  
    render() {
        return (
            <div style={{padding:15}}>
                {this.renderList()}
            </div>
        );
    }

}
// Get apps state and pass it as props to UserList
// > whenever state changes, the UserList will automatically re-render
function mapStateToProps(store) {
    return { requisitionTab:store.reqDetail.requisition.requisition,
          selectedVisitId:store.requisition.selectedVisitId};
}
const matchDispatchToProps = (dispatch) => ({
  loadRequistion: (selectedUserId) => dispatch(LoadRequistion(selectedUserId))

});
Requisition.propTypes = {
selectedVisitId:React.PropTypes.string.isRequired
}

export default connect(mapStateToProps,matchDispatchToProps)(Requisition);