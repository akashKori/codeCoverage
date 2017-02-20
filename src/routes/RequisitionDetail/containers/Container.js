import React, {Component} from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import {bindActionCreators} from 'redux';
import {LoadContainer} from '../modules/containerAction';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
class Container extends Component{
  constructor(props) {
        super(props);
        this.state = {
            fixedHeader: true,
            fixedFooter: true,
            stripedRows: false,
            showRowHover: true,
            selectable: true,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: false,
          
           
        };
    }
 componentWillMount() {
     const SelectedUserId=this.props.selectedVisitId;
     this.props.loadContainer(SelectedUserId);
      }
   renderList() {
        if(this.props.container  && this.props.container.length){
        return this.props.container.map((cont) => {
           return (
               <div key={cont.ContainerId}>
                     <h5>{cont.ContainerName}</h5>
                     <h5>Accession #: 10026</h5>
  <Table>
    <TableHeader displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={this.state.showCheckboxes} enableSelectAll={this.state.enableSelectAll}>
      <TableRow>
         <TableHeaderColumn>Container</TableHeaderColumn>
         <TableHeaderColumn>Collected</TableHeaderColumn>
         <TableHeaderColumn>Technician</TableHeaderColumn>
         <TableHeaderColumn>Status</TableHeaderColumn>
         <TableHeaderColumn>Received in Field</TableHeaderColumn>
         <TableHeaderColumn>Received in Lab</TableHeaderColumn>
         <TableHeaderColumn>Lab Receiver</TableHeaderColumn>
         <TableHeaderColumn>Barcode</TableHeaderColumn>
         <TableHeaderColumn>Location</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}>
    <TableRow>
          <TableRowColumn>Light Blue Tube</TableRowColumn>
          <TableRowColumn>{cont.CollectedDate}</TableRowColumn>
          <TableRowColumn>{cont.TechnicianName}</TableRowColumn>
          <TableRowColumn>{cont.Status}</TableRowColumn>
          <TableRowColumn></TableRowColumn>
          <TableRowColumn>{cont.ReceivedDate}</TableRowColumn>
          <TableRowColumn>{cont.TechnicianName}</TableRowColumn>
          <TableRowColumn>{cont.Barcode}</TableRowColumn>
          <TableRowColumn>{cont.Location}</TableRowColumn>
    </TableRow>
    </TableBody>
    </Table>

                 </div>

            );
        });}
        else{
             return (<div className='busy-indicator'>
                    <div className='busy-indicator__spinner'>
                        <CircularProgress size={40} thickness={5} />
                    </div>
                </div>);
        }
    }
     render() {
        return (
            <div style={{paddingLeft:15}}>
                {this.renderList()}
            </div>
        );
    }

}
// Get apps state and pass it as props to UserList
// > whenever state changes, the UserList will automatically re-render
function mapStateToProps(store) {
    return {container: store.reqDetail.container.container,
         selectedVisitId:store.requisition.selectedVisitId};
}
const matchDispatchToProps = (dispatch) => ({
  loadContainer: (selectedUserId) => dispatch(LoadContainer(selectedUserId))

});
Container.propTypes = {
selectedVisitId:React.PropTypes.string.isRequired
}

export default connect(mapStateToProps,matchDispatchToProps)(Container);