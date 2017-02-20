import React from 'react'
import { LoadReportData } from '../modules/labTestResultAction'
import { connect } from 'react-redux'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import PreviwImage from '../../assets/preview.png'
import SendEmailImage from '../../assets/send.png'
import ExportImage from '../../assets/export.png'
import RedrawImage from '../../assets/redraw.png'
import AddonImage from '../../assets/add-on.png'
import RerunImage from '../../assets/rerun.png'
import MoreActionImage from '../../assets/more-action.png'
import VoidResultImage from '../../assets/void-results.png'
import ReviewResultImage from '../../assets/review-results.png'
import ApproveResultImage from '../../assets/approve-results.png'
import IconMenu from 'material-ui/IconMenu'
class LabResultActionContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      pdfPath:''
    }
    this.openPreviewClick = this.openPreviewClick.bind(this)
  }
  openPreviewClick=(event) => {
    this.props.GetReport()
  }

  render () {
    return (
      <div className='labresult-topmenu'>
        <ul style={{ float: 'left' }}>
          <li >
            <IconMenu iconButtonElement={<IconButton className='iconmenu-labresult'>
              <img src={PreviwImage} /> <p>Preview</p></IconButton>}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              targetOrigin={{ horizontal: 'left', vertical: 'top' }} >
              <MenuItem primaryText='View Partial Report' onClick={this.openPreviewClick} />
              <MenuItem primaryText='Lab View' />
              <MenuItem primaryText='Physician View' />
              <MenuItem primaryText='Patient View' />
            </IconMenu>
          </li>

          <li >
            <IconMenu
              iconButtonElement={<IconButton className='iconmenu-labresult'>
                <img src={SendEmailImage} /> <p>Send</p></IconButton>}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                            >
              <MenuItem primaryText='Email' />
              <MenuItem primaryText='Fax' />
              <MenuItem primaryText='Sent Manually' />
            </IconMenu>
          </li>
          <li >
            <IconMenu
              iconButtonElement={<IconButton className='iconmenu-labresult'>
                <img src={RedrawImage} /> <p>Redraw</p></IconButton>}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                            >
              <MenuItem primaryText='Create New Redraw Request' />
              <MenuItem primaryText='View Existing Redraw Requests' />
            </IconMenu>
          </li>
          <li >
            <IconMenu
              iconButtonElement={<IconButton className='iconmenu-labresult'>
                <img src={RerunImage} /> <p>Rerun</p></IconButton>}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                            >
              <MenuItem primaryText='Create New Rerun' />
              <MenuItem primaryText='View Existing Rerun' />
            </IconMenu>
          </li>
          <li >
            <div className='result-export'>
              <button className='button-transparent'>
                <img src={ExportImage} /> <p>Export</p>
              </button>
            </div>
          </li>
          <li >
            <IconMenu
              iconButtonElement={<IconButton className='iconmenu-labresult'>
                <img src={AddonImage} /> <p>Add-on</p></IconButton>}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                            >
              <MenuItem primaryText=' Request New Add-on' />
              <MenuItem primaryText='View Existing Add-on Requests' />
            </IconMenu>
          </li>
        </ul>
        <ul style={{ float: 'right' }}>
          <li >
            <IconMenu
              iconButtonElement={<IconButton className='iconmenu-labresult'>
                <img src={MoreActionImage} /> <p>More Actions</p></IconButton>}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                            >
              <MenuItem primaryText='Review Image(CLS)' />
              <MenuItem primaryText='Run Reflex Text(CLA)' />
              <MenuItem primaryText='Verify Result(CLS)' />
              <MenuItem primaryText='Manual Report(CS)' />
              <MenuItem primaryText='Result Hold(CLS)' />
              <MenuItem primaryText='Visit Hold(CLS)' />
            </IconMenu>
          </li>

          <li >
            <IconMenu
              iconButtonElement={<IconButton className='iconmenu-labresult'>
                <img src={VoidResultImage} /> <p>Void Results</p></IconButton>}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                            >
              <MenuItem primaryText='Void All' />
              <MenuItem primaryText='Void Checked' />
            </IconMenu>
          </li>
          <li >
            <IconMenu
              iconButtonElement={<IconButton className='iconmenu-labresult'>
                <img src={ReviewResultImage} /> <p>Review Results</p></IconButton>}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                            >
              <MenuItem primaryText='Review All' />
              <MenuItem primaryText='Review Checked' />
            </IconMenu>
          </li>
          <li>
            <IconMenu
              iconButtonElement={<IconButton className='iconmenu-labresult'>
                <img src={ApproveResultImage} /> <p>Approved Results</p></IconButton>}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                            >
              <MenuItem primaryText='Approve All' onTouchTap={this.handleOpen} />
              <MenuItem primaryText='Approve Checked' />
            </IconMenu>
          </li>

        </ul>

      </div>
    )
  };
}
function mapStateToProps (allReducers) {
  return {
    reportPath: allReducers.reqDetail.labresult.reportPath
  }
}
const matchDispatchToProps = (dispatch) => ({
  GetReport: () => dispatch(LoadReportData())
})
export default connect(mapStateToProps, matchDispatchToProps)(LabResultActionContainer)
