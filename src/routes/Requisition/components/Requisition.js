import React from 'react';
import { TableRowProps, Table, TableBody, TableFooter, PagiFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import UltimatePagination from './UltimatePagination'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AttachementIcon from '../../assets/attachments.png';
import CriticalIcon from '../../assets/critical.png';
import NotesIcon from '../../assets/notes.png';
import LabReviewIcon from '../../assets/lab-review.png';
import NotificationIcon from '../../assets/notifications.png';
import TestPreviewIcon from '../../assets/test-preview.png';
import TestPreviewActiveIcon from '../../assets/test-preview-active.png';
import './Requisition.scss';
import CircularProgress from 'material-ui/CircularProgress';
import RequisitionAction from '../modules/requisition';


//update login page component work with redux so importing connect function
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import ContentFilter from 'material-ui/svg-icons/content/filter-list';
import Checkbox from 'material-ui/Checkbox';
import { List, ListItem } from 'material-ui/List';
import Popover from 'material-ui/Popover';
import FlatButton from 'material-ui/FlatButton';

// properties of TableHeader component
let headerProps = {
  enableSelectAll: false,
  displaySelectAll: false,
  adjustForCheckbox: false
};


// our table hader information, key is the name of the 
// property to sort by when the header is clicked 
let headers = [
  { name: "Accession#", key: "VisitSequenceId" },
  { name: "Visit Date", key: "VisitDate" },
  { name: "Visit Time", key: "VisitTime" },
  { name: "PSC Location", key: "PSCLocation" },
  { name: "Patient Name", key: "PatientName" },
  { name: "Gender", key: "PatientSex" },
  { name: "DOB", key: "PatientDOB" },
  { name: "Physician", key: "PhysicianName" },
  { name: "Physician Location", key: "PhysicianLocation" },
  { name: "Status", key: "VisitStatus" },
  { name: "NotesIcon", key: " " },
  { name: "AttachementIcon", key: " " },
  { name: "NotificationIcon", key: " " },
  { name: "CriticalIcon", key: " " },
  { name: "LabReviewIcon", key: " " },
];


 /**
  * Requisition: This component we are going to render on ui to display the list of requisition items.
    Here we are using state variable like sortBy and sortDir .These things we are going to pass API call.
  * @component Requisition
  */

class Requisition extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sortBy: 'VisitSequenceId', sortDir: 'ASC', pageSize: 5, page: 1, totalPages: 0, visitid: '', startPageNo: 1, endPageNo: 0,
      open: false,ColumnfilterList:[],
    };
    //This is the code for to bind the methods...
    this.onPageChange = this.onPageChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.openRequisitionDetail = this.openRequisitionDetail.bind(this);
    this.onSelectChange=this.onSelectChange.bind(this);
  }

  

 /**
  * getpageInfo: This following method is using for to display the records information based on page size
  * @function getpageInfo
  */

  getpageInfo() {

    let start = (this.state.page - 1) * this.state.pageSize + 1
    let end = this.props.totalCount;

    if (this.state.pageSize < this.props.totalCount) {
      end = this.state.pageSize * this.state.page
      if (end > this.props.totalCount) {
        end = this.props.totalCount;
      }
    }
    //Finally we are setting the values.
    this.setState({ startPageNo: start, endPageNo: end });

  }

  
  /**
  * componentWillMount: This method is component life cycle first method.Which is helpful to populate page load data here...
  * @function componentWillMount
  */
  componentWillMount() {
    if (this.props.requisitionList.length > 0) {

      //This property function we are making action redux and send api call.
      this.props.updateSortBy(this.state.sortBy, this.state.sortDir, this.state.page, this.state.pageSize);
      //Caluculate the total no of records of requisition list..

      let totalNoOfRecords = this.state.totalCount;
      this.getpageInfo();//this method is using for to display the records information of for each page
      this.setState({ totalPages: Math.ceil(totalNoOfRecords / this.state.pageSize) });
    }

  }

  
  /**
  * openRequisitionDetail:This is user defined function.We need to call manually.By using following method to open the requistion detail page.
  * @function openRequisitionDetail
  */
  openRequisitionDetail(visitId, patientName, visitSequenceId) {
    var windowTittle = patientName + "(" + visitSequenceId + ")"
    sessionStorage.setItem("visitId", visitId)
    sessionStorage.setItem("tabHeader", windowTittle);
    var tab = window.open('./requisition', windowTittle);
    // tab.addEventListener('focus',this.focus());

    //below method is to handle the issue of the some browser which is not supporting 
    //the autofocus for the existing record.
    setTimeout(function () {
      if (document.hasFocus()) {
        tab.close();
        window.open('./requisition', windowTittle)
      }
    }, 1);
   
  }

/**
  * shouldComponentUpdate:This method is life cycle method when ever update state any value in current component then we are going to call following methiod.
    Check the previous state and  next state both are same or not .If it is same means we are not re-render again while loading.
  * @function shouldComponentUpdate
  */

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.requisitionList != nextState.requisitionList;
  }

  /**
  * handleTouchTap:This code is using for to specific column should filter....and add to state like below.
  * @function handleTouchTap
  */
  handleTouchTap = (event) => {

    const {requisitionList} = this.props; 
    let FilterList = [];
    let filterListNew = [];
    
    if(event.currentTarget.name!=undefined)
    {
   
      filterListNew = requisitionList.map(function(a) {
      switch(event.currentTarget.name)
      {
        case "VisitSequenceId": return a.VisitSequenceId;
        break;
        case "VisitDate":return new Date(a.VisitDate).toLocaleDateString("en-US")
        break;
        case "VisitTime":return a.VisitTime;
        break;
        case "PSCLocation":return a.PSCLocation;
        break;
        case "PatientName":return a.PatientName;
        break;
        case "PatientSex":return a.PatientSex;
        break;
        case "PatientDOB":return new Date(a.PatientDOB).toLocaleDateString("en-US")
        break;
        case "PhysicianName":return a.PhysicianName;
        break;
        case "PhysicianLocation":return a.PhysicianLocation;
        break;
        case "VisitStatus": return a.VisitStatus;
        break;
        deafult:
        return null;

      }

      });


      FilterList =filterListNew.filter((x, i, a)=>a.indexOf(x) == i);
       this.setState({
       ColumnfilterList: FilterList,
      });
    }
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };


  /**
  * handleRequestClose:This following method is opening the filter menu on grid.
  * @function handleRequestClose
  */
  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };


 /**
  * onSelectChange:This following method is using for to select the particular check box select on filter menu.
  * @function handleRequestClose
  */

  onSelectChange(event, checked)
  {
    if(checked)
    {
      alert(1)
    }
    else{
      alert(121 )
    }
  }

  /**
  * renderHeaders:This "renderHeaders" help to us to render specific 'SortableHeader' component display on table.
  * @function renderHeaders
  */
  renderHeaders() {
    const {requisitionList} = this.props;
    let header = headers.map((h) => {

      return <SortableHeader
        key={h.key}
        Key={h.key}
        name={h.name}
        onClicked={() => this.updateSortBy(h.key)}
        isSortColumn={this.state.sortBy == h.key}
        handleTouchTap={this.handleTouchTap} handleRequestClose={this.handleRequestClose} open={this.state.open}
        anchorEl={this.state.anchorEl} filterList={this.state.ColumnfilterList} onSelectChange={this.onSelectChange}>    </SortableHeader>
    });
    return <TableRow>{header}</TableRow>;
  }

  /**
  * renderRows:This "renderRows" help to us to render specific 'UserRow' component display on table.
  * @function renderRows
  */
  renderRows() {

    const {requisitionList, VisitDetails, visitId, getVisitDetails} = this.props;
    if (this.props.requisitionList && this.props.requisitionList.length > 0) {
      const requisitionCollection = requisitionList.map((props, i) =>

        <TableRow key={i} onDoubleClick={() => this.openRequisitionDetail(props.PatientVisitId, props.PatientName, props.VisitSequenceId)} selected={props.selected}>
          <TableRowColumn className='accession-view__Id-column'>{props.VisitSequenceId}</TableRowColumn>
          <TableRowColumn className='accession-view__Visit-column'>{new Date(props.VisitDate).toLocaleDateString("en-US")}</TableRowColumn>
          <TableRowColumn className='accession-view__Visit-column'>{props.VisitTime}</TableRowColumn>
          <TableRowColumn>{props.PSCLocation}</TableRowColumn>
          <TableRowColumn>{props.PatientName}</TableRowColumn>
          <TableRowColumn className='accession-view__Gender-column'>{props.PatientSex}</TableRowColumn>
          <TableRowColumn className='accession-view__DOB-column'>{new Date(props.PatientDOB).toLocaleDateString("en-US")}</TableRowColumn>
          <TableRowColumn>{props.PhysicianName}</TableRowColumn>
          <TableRowColumn>{props.PhysicianLocation}</TableRowColumn>
          <TableRowColumn>{props.VisitStatus}</TableRowColumn>
          <TableRowColumn className='accession-view__Icon-column'></TableRowColumn>
          <TableRowColumn className='accession-view__Icon-column'> </TableRowColumn>
          <TableRowColumn className='accession-view__Icon-column'> </TableRowColumn>
          <TableRowColumn className='accession-view__Icon-column'> </TableRowColumn>
          <TableRowColumn > </TableRowColumn>
        </TableRow>
      )

      return requisitionCollection;
    }
    else {
      return (
        <div className='busy-indicator'>
          <div className='busy-indicator__spinner'>
            <CircularProgress size={40} thickness={5} />
          </div>
        </div>);
    }

  }

  /**
  * updateSortBy:This function help to us when user click on header column get the current sortby,sortdir values..   
  * @function updateSortBy
  */                           
  updateSortBy(sortBy) {

    if (this.state.sortDir === 'ASC') {

      this.state.sortDir = 'DESC';
    }
    else
      this.state.sortDir = 'ASC'

    //Get the current sortdirection on specific column.
    let sortDir = this.state.sortDir;

    //This property function we are making action redux and send api call.
    this.props.updateSortBy(sortBy, sortDir, this.state.page, this.state.pageSize);

    //Here we are setting new state of following state values.
    this.setState({ sortBy, sortDir });

  }

   /**
  * handleChange:This is the block to show the pagination of requisition list view all methods
  * @function handleChange
  */
  handleChange(event, index, pageSize) {

    //Caluculate the total no of records of requisition list..
    let totalNoOfRecords = this.props.totalCount;
    this.setState({ pageSize });
    this.setState({ totalPages: Math.ceil(totalNoOfRecords / pageSize) });


    //This property function we are making action redux and send api call.
    this.props.updateSortBy(this.state.sortBy, this.state.sortDir, this.state.page, pageSize);
    this.state.pageSize = pageSize;
    this.state.page = 1;
    this.getpageInfo();//this method is using for to display the records information of for each page

  }

  /**
  * onPageChange:This following method is using for to chage the page when user click on pagination.
  * @function onPageChange
  */

  onPageChange(page) {

    this.setState({ page });
    this.state.page = page;
    //This property function we are making action redux and send api call.
    this.props.updateSortBy(this.state.sortBy, this.state.sortDir, page, this.state.pageSize);
    this.getpageInfo();//this method is using for to display the records information of for each page

  }


 
  /**
  * render is main render of all table component to display the requisition list.
  */
  
  render() {

    const {updateSortBy, handleChange, onPageChange, totalCount, getVisitDetails} = this.props;
    //Caluculate the total no of records of requisition list..
    let totalNoOfRecords = totalCount;
    let val = Math.ceil(totalNoOfRecords / this.state.pageSize);
    this.state.totalPages = val;

    return (

      <div className='full-height'>
        <h4 className='accession-heading'>Accession</h4>
        <div className='accession-view'>
          <Table>
            <TableHeader {...headerProps}>
              {this.renderHeaders()}
            </TableHeader>

            <TableBody displayRowCheckbox={false}
              deselectOnClickaway={false}>
              {this.renderRows()}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableRowColumn>
                  <div className='pagination'>
                    <div className='flt-lt'>
                      <p htmlFor="pageSizes" className='pagination__paging-text'>  Rows per page: </p>
                      <SelectField style={{ width: 80, height: 45 }}
                        hintText="Please select"
                        value={this.state.pageSize}
                        onChange={this.handleChange} >

                        {/*<MenuItem value={null} primaryText="" />*/}

                        <MenuItem value={5} primaryText="5" />
                        <MenuItem value={10} primaryText="10" />
                        <MenuItem value={20} primaryText="20" />
                        <MenuItem value={50} primaryText="50" />
                      </SelectField>
                    </div>
                    <p className='pagination__paging-text'>
                      {this.state.startPageNo + '-' + this.state.endPageNo + ' of ' + this.props.totalCount}
                    </p>
                    <div className='pagination__paging-number'>
                      <UltimatePagination
                        currentPage={this.state.page}
                        totalPages={this.state.totalPages}
                        onChange={this.onPageChange}
                        />
                    </div>

                  </div>

                </TableRowColumn>
              </TableRow>
            </TableFooter>
          </Table>

        </div>

        <div>
        </div>
      </div>

    );
  }
}

//Here we are declaring the propertys of all requisition list items.
Requisition.propTypes = {
  requisitionList: React.PropTypes.arrayOf(
    React.PropTypes.shape({

      VisitSequenceId: React.PropTypes.number.isRequired,
      PatientName: React.PropTypes.string.isRequired,
      PhysicianName: React.PropTypes.string.isRequired,
      PSCLocation: React.PropTypes.string.isRequired,
      PatientSex: React.PropTypes.string.isRequired,
      PhysicianLocation: React.PropTypes.string.isRequired,
      VisitDate: React.PropTypes.string.isRequired,
      VisitTime: React.PropTypes.string.isRequired,
      PatientDOB: React.PropTypes.string.isRequired,
      VisitStatus: React.PropTypes.string.isRequired,
      PatientVisitId: React.PropTypes.string.isRequired,

    }).isRequired
  ),

  getVisitDetails: React.PropTypes.func.isRequired,
  updateSortBy: React.PropTypes.func.isRequired,
  sortBy: React.PropTypes.string,
  sortDir: React.PropTypes.string,
  pageSize: React.PropTypes.number,
  page: React.PropTypes.number,
  totalCount: React.PropTypes.number,
  totalPages: React.PropTypes.number,

};

export default Requisition;



//******This section we are manipulating the table componets ******/

  /**
  * SortableHeader:This function we are using to make the headercolumns of table with dynamic property values.
  * @function SortableHeader
  * @param props using  to populate the header names on table. 
  */
function SortableHeader(props) {
const listGender = [];

  for (let i = 0; i < props.filterList.length; i++) {
    listGender.push(<ListItem primaryText={props.filterList[i]} key={i + length} rightIcon={<Checkbox disabled={false} onCheck={props.onSelectChange} />} />);
  }

  let style =  {
    cursor: "pointer",
    visibility: "visible",
  }
  let iconStyle=
  {
    cursor: "pointer",
    visibility: "visible",
    width: 10, 
    height: 10, 
    top: 8 
  }
  let imgStyle = {
    visibility: "hidden",
    marginTop:"-25px",
    position:"relative"

  }
  let columnWidth = {
    with: "auto"
  }

  if (props.isSortColumn) {

    style.fontWeight = "bold";
    style.color = "black";
  }

  //Here we are specifying for icons on Tableheader specification.
  if (props.name != undefined && props.name != " ") {
    var value = '';
    switch (props.name) {

      case "Accession#": columnWidth.width = 135;
        break;
      case "Visit Date": columnWidth.width = 130;
        break;
      case "Visit Time": columnWidth.width = 130;
        break;
      case "Gender": columnWidth.width = 115;
        break;
      case "DOB": columnWidth.width = 120;
        break;
      case "NotesIcon": imgStyle.visibility = "visible"; style.visibility = "hidden"; columnWidth.width = 50;iconStyle.visibility="hidden";
        value = NotesIcon;
        break;
      case "AttachementIcon": imgStyle.visibility = "visible"; style.visibility = "hidden"; columnWidth.width = 50;iconStyle.visibility="hidden";
        value = AttachementIcon;
        break;
      case "NotificationIcon": imgStyle.visibility = "visible"; style.visibility = "hidden"; columnWidth.width = 50;iconStyle.visibility="hidden";
        value = NotificationIcon
        break;
      case "CriticalIcon": imgStyle.visibility = "visible"; style.visibility = "hidden"; columnWidth.width = 50;iconStyle.visibility="hidden";
        value = CriticalIcon;
        break;
      case "LabReviewIcon": imgStyle.visibility = "visible"; style.visibility = "hidden";iconStyle.visibility="hidden";
        value = LabReviewIcon;
        break;

      default: "";

    }

  }

  /**
  * return:/Finally we are rendering the Table headers here specifing all propertys.
  * @function return
  
  */
  return (
    <TableHeaderColumn style={columnWidth} >
    <div>
      <div ><span style={style} onClick={() => props.onClicked()}>{props.name}</span>   <IconButton onTouchTap={props.handleTouchTap} style={iconStyle} name={props.Key}><ContentFilter/></IconButton> </div>
    
      <img style={imgStyle} src={value} />
        <Popover
        open={props.open}
        anchorEl={props.anchorEl}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
        onRequestClose={props.handleRequestClose}>

        <List>
          {listGender}
        </List>
      </Popover>
      </div>

    </TableHeaderColumn>

  );
}








