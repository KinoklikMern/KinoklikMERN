import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useParams } from "react-router-dom";
import http from "../../../http-common";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
// import { useTranslation } from "react-i18next";
import { getFepksById } from "../../../api/epks";

export default function BasicMenu({ color }) {
  // const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // fetching user
  const user = useSelector((state) => state.user);
  const filmmaker_id = user.id;

  // let { title } = useParams();
  let { id } = useParams();
  // const navigate = useNavigate();

  const [fepkList, setFepkList] = React.useState([]);
  const [fepk, setFepk] = React.useState([]);

  React.useEffect(() => {
    getFepksById(id).then((response) => {
      console.log("fepk menu id", id);
      setFepk(response);
    });
    http.get(`/fepks/byfilmmaker/${filmmaker_id}`).then((response) => {
      setFepkList(response.data);
    });
  }, [id, filmmaker_id]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    console.log("fepkList", fepkList);
  }, [fepkList]);

  React.useEffect(() => {
    console.log("fepk", fepk);
  }, [fepk]);

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <h6
          className="col align-items-start"
          style={{ color: color, fontWeight: "bold" }}
        >
          <FontAwesomeIcon
            icon={faCaretDown}
            style={{ fontSize: "30px", color: "#712cb0" }}
          />{" "}
          {/*{t("Project:")}*/}
          {/*<span*/}
          {/*  className="tw-text-center tw-text-sm tw-font-bold tw-text-[#1E0039] md:tw-text-xl lg:tw-text-2xl"*/}
          {/*  // style={{*/}
          {/*  //   fontWeight: "bold",*/}
          {/*  //   margin: "2px 0 0 2px",*/}
          {/*  //   color: color,*/}
          {/*  //   fontSize: "25px",*/}
          {/*  // }}*/}
          {/*>*/}
          {/*  {fepk.title}*/}
          {/*</span>*/}
        </h6>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {fepkList.map((val) => {
          return (
            <MenuItem key={val._id}>
              <a
                href={val.title ? `/editFepk/${val._id}` : "/"}
                style={{
                  color: "#311465",
                  textDecoration: "none",
                }}
              >
                {val.title}
              </a>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
