import React, { Component } from 'react'
import { LoadAttachement } from '../modules/attachementAction'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { connect } from 'react-redux'
import CircularProgress from 'material-ui/CircularProgress'

class Attachment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: true,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false

    }
  }
  componentWillMount () {
    var self = this
    setTimeout(() => {
      self.setState({ loading: false })
    }, 9999)

    const SelectedUserId = this.props.selectedVisitId
    this.props.loadAttachement(SelectedUserId)
  }
  renderList () {
    if (this.props.attachement && this.props.attachement.length) {
      return this.props.attachement.map((att) => {
        return (
          <div key={att.AttachmentId}>

            <Table>
              <TableHeader displaySelectAll={this.state.showCheckboxes}
                           adjustForCheckbox={this.state.showCheckboxes} 
                           enableSelectAll={this.state.enableSelectAll}>
                <TableRow>
                  <TableHeaderColumn>Name </TableHeaderColumn>
                  <TableHeaderColumn>Type</TableHeaderColumn>
                  <TableHeaderColumn>Description</TableHeaderColumn>
                  <TableHeaderColumn>Created By</TableHeaderColumn>
                  <TableHeaderColumn>Created On</TableHeaderColumn>
                  <TableHeaderColumn>Open Attachment</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={this.state.showCheckboxes}
                deselectOnClickaway={this.state.deselectOnClickaway}
                showRowHover={this.state.showRowHover}
                stripedRows={this.state.stripedRows}>
                <TableRow>
                  <TableRowColumn>{att.AttachmentName}</TableRowColumn>
                  <TableRowColumn>{att.AttachmentType}</TableRowColumn>
                  <TableRowColumn>{att.Description}</TableRowColumn>
                  <TableRowColumn />
                  <TableRowColumn />
                  <TableRowColumn />
                </TableRow>
              </TableBody>
            </Table>
          </div>

        )
      })
    } else {
      return (
        <div className='busy-indicator'>
          <div className='busy-indicator__spinner'>
            <CircularProgress size={40} thickness={5} />
          </div>
        </div>
      )
    }
  }
  render () {
    return (
      <ul>
        {this.renderList()}
      </ul>
    )
  }

}
// Get apps state and pass it as props to UserList
// > whenever state changes, the UserList will automatically re-render
function mapStateToProps (allReducers) {
  return {
    attachement: allReducers.reqDetail.attachement.attachement,
    selectedVisitId: allReducers.requisition.selectedVisitId
  }
}
const matchDispatchToProps = (dispatch) => ({
  loadAttachement: (selectedUserId) => dispatch(LoadAttachement(selectedUserId))

})

Attachment.propTypes = {
  selectedVisitId: React.PropTypes.string.isRequired
}

export default connect(mapStateToProps, matchDispatchToProps)(Attachment)
