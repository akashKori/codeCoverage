import React from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'
import LabTestResult from '../../containers/LabTestResult'
import './RequistionDetail.scss'
import Requisition from '../../containers/Requisition'
import Container from '../../containers/Container'
import Attachment from '../../containers/Attachment'
import IconButton from 'material-ui/IconButton'
import SocialPerson from 'material-ui/svg-icons/social/person'
import Paper from 'material-ui/Paper'
import PatientInfoContainer from '../../containers/PatientInfoContainer'
import LabResultActionContainer from '../../containers/LabResultActionContainer'
export default class RequisitionDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: 'a',
      open: false
    }
  }

  handleChange = (value) => {
    this.setState({
      value: value
    })
  };

  render () {
    return (
      <div className='full-height'>
        {/* #Patient Basic Information Block */}
        <div className='basic-info'>
          <h4> Basic Information</h4>
          <div className='basic-info__border' >
            <Paper zDepth={1} >
              <IconButton style={{verticalAlign:'middle',height:'40' }}>
                <SocialPerson />
              </IconButton>
              <span style={{top:'6',position:'relative'}}> <b>Patient</b></span>
              <PatientInfoContainer/>
            </Paper>
            <Paper zDepth={1}>
              <div style={{padding: 10, marginBottom: 10}}>
                <b>Lab Order</b>
                <p className='text-basicInfo'>ORDER</p>
                <p className='text-basicInfo'>New Order,<span>LIS</span></p>
                <p className='text-basicInfo'>Dr.Sanjay Kumar</p>
                <p className='text-basicInfo'>Palo Alto</p>
                <p className='text-basicInfo'>Final Report Sent:<span /></p>
                <p className='text-basicInfo'>TrunAround Time:<span /></p>
                <p className='text-basicInfo'>Report Status:<span>No Report Sent</span></p>
              </div>
            </Paper>

            <Paper zDepth={1} >

              <div style={{ padding: 10, marginBottom: 10 }}>
                <b >Visit</b>
                <p className='text-basicInfo'>ORDER</p>
                <p className='text-basicInfo'><b>Status</b><span>Results partially Uploaded</span></p>
                <p className='text-basicInfo'>Theranos</p>
                <p className='text-basicInfo'>Palo Alto</p>
                <p className='text-basicInfo'>3200 Hillview Ave<span /></p>
                <p className='text-basicInfo'>HQ lab:<span>Newwark</span></p>
                <p className='text-basicInfo'>Report Status:<span>No Report Sent</span></p>
                <p className='text-basicInfo'>Fasting: <span>Yes</span></p>
              </div>
            </Paper>

          </div>
        </div>
        {/* #Requisition Details Block */}
        <div className='requisition-details' >
          <div>
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}>
              <Tab label='Lab Result' value='a' >
                <div className='result-view'>
                  <div className='result-view__scroll'>
                    <LabResultActionContainer />
                    <div className='border-line' style={{ margin: 0, width: '100%' }} />
                    <LabTestResult />
                  </div>
                </div>
              </Tab>
              <Tab label='Requisition' value='b'>
                <div className='result-view'>
                  <div className='result-view__scroll'>
                    <Requisition />
                  </div>
                </div>
              </Tab>
              <Tab label='Container' value='c'>
                <div className='result-view'>
                  <div className='result-view__scroll'>
                    <h4 style={{ paddingLeft: 15, marginBottom: 0 }}>PSC Collection Container</h4>
                    <Container />
                  </div>
                </div>
              </Tab>
              <Tab label='Attachment' value='at'>
                <div className='result-view'>
                  <div className='result-view__scroll'>
                    <Attachment />
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
        {/* #Requisition Notes Block */}
        <div className='requisition-notes' >
          <div className='requisition-notes__border'>
            <b >Notes</b>
            <div className='border-line' />
            <p className='text-basicInfo'>Trinadh rao</p>
            <p className='text-basicInfo'><span>M</span>,<span>08/08/1986</span>,<span>28 y</span> </p>
            <p className='text-basicInfo'>(900)-089-8065(M)</p>
            <p className='text-basicInfo'>(900)-089-8065(M)</p>
            <p className='text-basicInfo'>trinadh@gmail.com</p>
            <p className='text-basicInfo'>Marathahalli,</p>
            <p className='text-basicInfo'>Dolylestown,<span>PA-18902</span></p>
            <div className='border-line' />
          </div>
        </div>
      </div>
    )
  }
}
