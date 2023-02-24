import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, Link, useParams } from 'react-router-dom';
import http from "../../../http-common";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // fetching user
  const { user } = useSelector((user) => ({ ...user }));
  const filmmaker_id = user.id;

  let { fepkId } = useParams();
  const navigate = useNavigate();

  const [fepkList, setFepkList] = React.useState([]);
  const [fepk, setFepk] = React.useState([]);

  React.useEffect(() => {
    http.get(`/fepks/byfilmmaker/${filmmaker_id}`).then((response) =>{
        setFepkList(response.data);
    });
    http.get(`/fepks/${fepkId}`).then((response) =>{
        setFepk(response.data);
        console.log(response.data.title);
    });
  }, [fepkId]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <h6 className="col align-items-start" style={{color: "#311465", fontWeight: 'normal'}}>
          <FontAwesomeIcon icon={faCaretDown} style={{height: "15px"}}/> Project: 
          <span style={{fontWeight: 'bold', margin:"2px 0 0 2px"}}>{fepk.title}</span>
        </h6>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {fepkList.map((val) => {
                    return (
                        <MenuItem><a href={`/editFepk/${val._id}`} style={{color: "#311465", textDecoration: "none" }}>{val.title}</a></MenuItem>
                    );
        })}
      </Menu>
    </div>
  );
}