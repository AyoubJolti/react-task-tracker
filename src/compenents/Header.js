import PropTypes from 'prop-types';
import Button from "./Button";
const Header = ({title,onClickAdd,textButton}) =>{
 return(
    <header className='header'>
        <h1  style={style}>{title}</h1>
        <Button text={textButton} onClick={onClickAdd}/>
    </header>
 )
}
Header.defaultProps = {
    title : 'Task Tracker',
  }
Header.propTypes = {
title : PropTypes.string.isRequired,
}
const style = {
    color:'red',backgroundColor :'black'
}  
export default Header