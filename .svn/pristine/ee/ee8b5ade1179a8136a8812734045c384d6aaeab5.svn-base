import React from 'react'
const PatientInfo = ({ FirstName,LastName, Gender,DOB,PhoneNumber}) => {
    
        return (
            <div style={{ paddingLeft: 10, paddingBottom: 10, marginBottom: 10 }}>
            <div className='border-line' />
            <p className='text-basicInfo'>{FirstName} ,{LastName}</p>
            <p className='text-basicInfo'><span>{Gender}</span>,<span>{new Date(DOB).toLocaleDateString("en-US")}</span>,<span>28 y</span> </p>
            <p className='text-basicInfo'>{PhoneNumber}</p>
            <p className='text-basicInfo'>(900)-089-8065(M)</p>
            <p className='text-basicInfo'>trinadh@gmail.com</p>
            <p className='text-basicInfo'>Marathahalli,</p>
            <p className='text-basicInfo'>Dolylestown,<span>PA-18903</span></p>
            <div className='border-line' /> 
            </div>           
         );
    }

PatientInfo.propTypes = {
  FirstName: React.PropTypes.string,
  LastName : React.PropTypes.string,
  Gender : React.PropTypes.string,
  DOB :  React.PropTypes.string,
  PhoneNumber : React.PropTypes.string
};


export default PatientInfo