import { connect } from 'react-redux';
import PatientInfo from '../components/Requisition/PatientInfo';
import React from 'react';

class PatientInfoContainer extends React.Component {
//   componentWillMount() {
//     if (!this.props.employees || !this.props.employees.length) {
//       this.props.requestEmployees();
//     }
//   }

  render() {
      const{patientInfo}=this.props;
    return (
      <PatientInfo {...patientInfo}/>
    )
  }
}

const mapStateToProps = (state) => ({
  patientInfo: state.requisition.patientInfo,
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PatientInfoContainer);
