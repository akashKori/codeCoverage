import React from 'react'
import { createUltimatePagination, ITEM_TYPES } from 'react-ultimate-pagination'
import FlatButton from 'material-ui/FlatButton'
import NavigationFirstPage from 'material-ui/svg-icons/navigation/first-page'
import NavigationLastPage from 'material-ui/svg-icons/navigation/last-page'
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left'
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right'

const flatButtonStyle = {
  minWidth: 36,
 
}
 const style=
 {
   display:'none',
 }


const Page = ({ value, isActive, onClick }) => (

  <FlatButton style={flatButtonStyle} label={value.toString()} primary={isActive} onClick={() => onClick()} />
)

const Ellipsis = ({ onClick }) => (
  <FlatButton style={flatButtonStyle} label='...' onClick={onClick} />
)

const FirstPageLink = ({ isActive, onClick }) => {

  return(
  <FlatButton  style={isActive?{display:'none'}:flatButtonStyle} icon={<NavigationFirstPage />} onClick={onClick}  disabled={isActive} />
  );
}

const PreviousPageLink = ({ isActive, onClick }) => (
  <FlatButton style={isActive?{display:'none'}:flatButtonStyle}  icon={<NavigationChevronLeft />} onClick={onClick} disabled={isActive} />
)

const NextPageLink = ({ isActive, onClick }) => (
  <FlatButton style={isActive?{display:'none'}:flatButtonStyle} icon={<NavigationChevronRight />} onClick={onClick}  disabled={isActive}/>
)

const LastPageLink = ({ isActive, onClick }) => (
  <FlatButton style={isActive?{display:'none'}:flatButtonStyle} icon={<NavigationLastPage />} onClick={onClick}  disabled={isActive}/>
)

const itemTypeToComponent = {
  [ITEM_TYPES.PAGE]: Page,
  [ITEM_TYPES.ELLIPSIS]: Ellipsis,
  [ITEM_TYPES.FIRST_PAGE_LINK]: FirstPageLink,
  [ITEM_TYPES.PREVIOUS_PAGE_LINK]: PreviousPageLink,
  [ITEM_TYPES.NEXT_PAGE_LINK]: NextPageLink,
  [ITEM_TYPES.LAST_PAGE_LINK]: LastPageLink
}

const UltimatePaginationMaterialUi = createUltimatePagination({ itemTypeToComponent })

export default UltimatePaginationMaterialUi
